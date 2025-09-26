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
        const response = await fetch("https://news-summarizer-and-analyst-using-zmdk.onrender.com/analyze", {
         method: "POST",
            headers: {
                "Content-Type": "application/json"  
            },
            body: JSON.stringify({ "news": newsText })  // Must match your Pydantic model field
        });

        if (!response.ok) {
            const errData = await response.json();
            summaryDiv.innerText = "Error: " + (errData.error || response.statusText);
            return;
        }

        const data = await response.json();

        if (data.summary) {
        if (Array.isArray(data.summary)) {
        summaryDiv.innerText = data.summary.join("\n");
        } else {
        summaryDiv.innerText = data.summary;
        }
        } else {
        summaryDiv.innerText = "No summary available.";
        }

    } catch (error) {
        console.error("Error:", error);
        summaryDiv.innerText = error;
    }
});
