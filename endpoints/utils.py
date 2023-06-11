from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import string
import nltk
nltk.download('wordnet')  # download if using this module for the first time

stopwords = set(stopwords.words('english'))
exclude = set(string.punctuation)
lemma = WordNetLemmatizer()


def clean(document):
    stopwordremoval = " ".join(
        [i for i in document.lower().split() if i not in stopwords])
    punctuationremoval = ''.join(
        ch for ch in stopwordremoval if ch not in exclude)
    normalized = " ".join(lemma.lemmatize(word)
                          for word in punctuationremoval.split())
    return normalized
