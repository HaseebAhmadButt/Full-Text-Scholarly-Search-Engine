from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
import requests
import json
import torch
import pickle
import os
import numpy as np


# Set the path to the BERT model directory
current_working_dir = os.getcwd()

MODEL_DIR = current_working_dir + "/endpoints/ML_Model/BERT"
SOLR_URL = "http://0.0.0.0:8983/solr"
COLLECTION = "mycore"

with open(MODEL_DIR + "/model_pickle", 'rb') as f:
    model = pickle.load(f)
with open(MODEL_DIR + "/tokenizer_pickle", 'rb') as f:
    tokenizer = pickle.load(f)


router = APIRouter(
    prefix="/solr",
    tags=["solr"],
    responses={404: {"description": "Not found"}},
)


class JournalRequest(BaseModel):
    query: str
    Journal_Name: str
    rows: Optional[int] = 100


class Request(BaseModel):
    query: str
    rows: Optional[int] = 100


# id, Title, Abstract, Published_Date, Journal_Name,Authors_List, Topics_List
class PaperData(BaseModel):
    id: str
    Title: str
    Abstract: str
    Published_Date: float
    Journal_Name: str
    Authors_List: Optional[list] = None
    Topics_List: Optional[list] = None
    vector: Optional[list] = None


def get_bert_embedding(text, window_size=512, stride=256):

    input_ids = tokenizer.encode(text, add_special_tokens=True)
    input_length = len(input_ids)

    embeddings_list = []

    for start_idx in range(0, input_length, stride):
        end_idx = min(start_idx + window_size, input_length)

        input_ids_chunk = input_ids[start_idx:end_idx]
        input_ids_tensor = torch.tensor([input_ids_chunk])

        with torch.no_grad():
            model_output = model(input_ids_tensor)
            embeddings = model_output.last_hidden_state

        sentence_embedding = torch.mean(embeddings, dim=1).squeeze().numpy()
        embeddings_list.append(sentence_embedding)

    # Average embeddings from all chunks
    sentence_embedding = np.mean(embeddings_list, axis=0)
    return sentence_embedding


def index_data_in_Solr(data):
    try:
        headers = {"Content-Type": "application/json"}
        url = f"{SOLR_URL}/{COLLECTION}/update?commit=true"
        response = requests.post(url, data=json.dumps(data), headers=headers)
        if response.status_code == 200:
            print(f"Indexed {len(data)} document")
            return True
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
            return False
    except Exception as e:
        print(f"Error: {e}")
        return False


@router.post("/index_data", response_model=None)
async def index_data(paper_data: PaperData):

    text = paper_data.Title + " " + paper_data.Abstract
    bert_embeddings = get_bert_embedding(text)
    paper_data.vector = bert_embeddings.tolist()
    document = json.loads(paper_data.json())
    documents_to_index = []
    documents_to_index.append(document)
    if index_data_in_Solr(documents_to_index):
        return {"message": "Indexed Successfully"}
    else:
        return {"message": "Error in indexing"}


def search_in_Solr(vector, request):
    bert_vector_str = ",".join(map(str, vector))

    url = f"{SOLR_URL}/{COLLECTION}/select"
    query = f"{{!vp f=vector vector=\"{bert_vector_str}\"}}"

    data = {
        "q": f"(Title:{request.query}) OR (Abstract:{request.query})",
        "fq": query,
        "fl": "id,Title,Abstract,Published_Date,Authors_List,Topics_List,Journal_Name,score",
        "rows": request.rows,
        "sort": "score desc",
        "wt": "json"
    }

    response = requests.post(url, data=data)
    if response.status_code == 200:
        results = response.json()["response"]["docs"]

        return results
    else:
        print(f"Error: {response.status_code}")
        print(f"Response text: {response.text}")
        return []


@router.post("/search", response_model=None)
async def search(request: Request):
    vector = get_bert_embedding(request.query)
    results = search_in_Solr(vector, request)
    return results


def delete_in_Solr(id: str):
    #  delete the Solr document using id
    url = f"{SOLR_URL}/{COLLECTION}/update?commit=true"
    data = {
        "delete": {
            "query": f"id:{id}"
        }
    }
    headers = {"Content-Type": "application/json"}
    response = requests.post(url, data=json.dumps(data), headers=headers)
    if response.status_code == 200:
        print(f"Deleted {id} document")
        return True
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return False


@router.delete("/delete", response_model=None)
async def delete(id: str):
    if delete_in_Solr(id):
        return {"message": "Deleted Successfully"}
    else:
        return {"message": "Error in deleting"}


def delete_all_documents():
    #  delete all the Solr documents
    url = f"{SOLR_URL}/{COLLECTION}/update?commit=true"
    data = {
        "delete": {
            "query": "*:*"
        }
    }
    headers = {"Content-Type": "application/json"}
    response = requests.post(url, data=json.dumps(data), headers=headers)
    if response.status_code == 200:
        print(f"Deleted all documents")
        return True
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return False


@router.delete("/delete_all", response_model=None)
async def delete_all():
    if delete_all_documents():
        return {"message": "Deleted Successfully"}
    else:
        return {"message": "Error in deleting"}
