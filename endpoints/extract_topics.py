import re
from gensim import corpora
import gensim
from fastapi import APIRouter
from endpoints.utils import clean



router = APIRouter(
    prefix="/extract_topic",
    tags=["extract_topic"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def get_topics(paragraph: str, num_topics: int = 3, num_words: int = 1):
    compileddoc = [paragraph]
    final_doc = [clean(document).split() for document in compileddoc]
    dictionary = corpora.Dictionary(final_doc)
    DT_matrix = [dictionary.doc2bow(doc) for doc in final_doc]
    Lda_object = gensim.models.ldamodel.LdaModel
    lda_model_1 = Lda_object(
        DT_matrix, num_topics=num_topics, id2word=dictionary)
    topics = lda_model_1.show_topics(
        num_topics=num_topics, num_words=num_words, formatted=True)
    topics_dict = {}
    for topic in topics:
        # Extract words and probabilities
        words_probabilities_str = topic[1]
        pattern = r"(\d+\.\d+)\*\"(\w+)\""
        matches = re.findall(pattern, words_probabilities_str)
        # Create list of dicts
        list_of_dicts = [{"probability": float(
            prob), "word": word} for prob, word in matches]
        topics_dict[topic[0]] = list_of_dicts
    # sort the dict based on Probablity Descending order
    topics_dict = dict(sorted(topics_dict.items(),
                              key=lambda item: item[1][0]['probability'], reverse=True))
    return topics_dict
