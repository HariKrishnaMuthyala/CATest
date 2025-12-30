document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll(".quiz-form");

  forms.forEach((form) => {
    const button = form.querySelector(".check-answers");
    const scoreContainer = form.querySelector(".quiz-score");

    if (!button) return;

    button.addEventListener("click", function () {
      const questions = form.querySelectorAll(".question");
      let correctCount = 0;
      let total = questions.length;

      questions.forEach((q) => {
        q.classList.remove("correct", "incorrect");
        q.querySelectorAll("label").forEach((label) => {
          label.classList.remove("correct-answer", "selected-incorrect");
        });

        const correctValue = q.getAttribute("data-correct");
        const name = q.getAttribute("data-name");
        const selected = form.querySelector(
          `input[name="${name}"]:checked`
        );

        if (!correctValue || !name) {
          return;
        }

        const correctInput = form.querySelector(
          `input[name="${name}"][value="${correctValue}"]`
        );

        if (correctInput) {
          const correctLabel = correctInput.closest("label");
          if (correctLabel) {
            correctLabel.classList.add("correct-answer");
          }
        }

        if (!selected) {
          q.classList.add("incorrect");
          return;
        }

        if (selected.value === correctValue) {
          q.classList.add("correct");
          correctCount++;
        } else {
          q.classList.add("incorrect");
          const selectedLabel = selected.closest("label");
          if (selectedLabel) {
            selectedLabel.classList.add("selected-incorrect");
          }
        }
      });

      if (scoreContainer) {
        scoreContainer.textContent = `You scored ${correctCount} out of ${total}.`;
      }
    });
  });
});
