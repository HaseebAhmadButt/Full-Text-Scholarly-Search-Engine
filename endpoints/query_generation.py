import os
from fastapi import APIRouter
from pydantic import BaseModel
from transformers import T5Tokenizer, T5ForConditionalGeneration

# Set the path to the QUERY_GENERATION model directory
current_working_dir = os.getcwd()

MODEL_DIR = current_working_dir + "/endpoints/ML_Model/Query_Generation"
tokenizer = T5Tokenizer.from_pretrained(MODEL_DIR)
model = T5ForConditionalGeneration.from_pretrained(MODEL_DIR)

model.eval()
device = "cpu"
model.to(device)

def generate_query(text, max_length=128, num_return_sequences=2, max_input_length=512):
    input_text = f"generate question: {text}"
    input_ids = tokenizer.encode(input_text, return_tensors='pt', max_length=max_input_length, truncation=True)
    
    output = model.generate(
        input_ids=input_ids,
        max_length=max_length,
        do_sample=True,
        top_p=0.95,
        num_return_sequences=num_return_sequences)
    
    queries = [tokenizer.decode(output_seq, skip_special_tokens=True, clean_up_tokenization_spaces=True) for output_seq in output]
    return queries


router = APIRouter(
    prefix="/query_generation",
    tags=["query_generation"],
    responses={404: {"description": "Not found"}},
)

class RequestQueryGeneration(BaseModel):
    paragraph: str



@router.post("/")
async def query_generation(request: RequestQueryGeneration):
    paragraph = request.paragraph
    queries = generate_query(paragraph)
    return queries
