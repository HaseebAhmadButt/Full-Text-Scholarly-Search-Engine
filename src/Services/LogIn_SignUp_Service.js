

export async function UserSignUp(data){
        const response = await fetch('http://localhost:8765/KNOWLEDGEVERSE-MYSQL-WRITING-ENTITY/createAccount', {
            method: 'POST',
            headers:{"Content-Type":"application/json", "Accept": "application/json"},
            body: JSON.stringify(data)
        });
        if(response.status===409) return "E-Mail Already Exists";
        if (!response.ok) {throw new Error(`HTTP error! status: ${response.statusText}`);}
        return await response.json();
}