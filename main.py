from fastapi import FastAPI

from endpoints import solr_APIs, query_generation, extract_topics

app = FastAPI()
app.include_router(extract_topics.router)
app.include_router(solr_APIs.router)
app.include_router(query_generation.router)