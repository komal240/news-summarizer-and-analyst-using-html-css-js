const analyzeBtn = document.getElementById("analyzeBtn");
const newsInput = document.getElementById("newsInput");
const summaryDiv = document.getElementById("summary");

analyzeBtn.addEventListener("click", async () => {
    const newsText = newsInput.value.trim();

    if (!newsText) {
        alert("Please paste a news article!");
        return;
    }

     summaryDiv.innerText = "Analyzing news, please wait...";

    try {
        const response = await fetch("http://localhost:5000/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ news: newsText })  // Must match your Pydantic model field
        });

        if (!response.ok) {
            const errData = await response.json();
            summaryDiv.innerText = "Error: " + (errData.error || response.statusText);
            return;
        }

        const data = await response.json();

        // Display either from DB or Gemini API
        if (data.summery) {
            summaryDiv.innerText = data.summery.join("\n");
        } else if (data.recipe) {
            summaryDiv.innerText = data.recipe;
        } else {
            summaryDiv.innerText = "No summary available.";
        }

    } catch (error) {
        console.error("Error:", error);
        summaryDiv.innerText = "Error fetching data.";
    }
});
