import { Exercise } from "@/data/exercises";

const feedbackTemplates: Record<string, string[]> = {
  "1": [
    "Great start! Your shapes show good understanding of basic forms. Try to make your circles more consistent - practice drawing them in one smooth motion. Keep up the excellent work!",
    "Nice work on the basic shapes! I can see you're getting comfortable with the fundamentals. For your next attempt, focus on making the edges of your squares sharper and more defined. You're making progress!",
    "Well done! Your shapes demonstrate solid foundational skills. Consider practicing varying sizes to improve your control. Remember, consistency comes with practice - keep drawing!",
  ],
  "2": [
    "Excellent line work! Your lines show good control and confidence. Try experimenting with different line weights to add more visual interest. Great job!",
    "Nice progress on line quality! Your straight lines are looking clean. For improvement, practice making your curved lines smoother - try drawing them in one continuous motion. Keep practicing!",
    "Good work on line control! I can see improvement in your consistency. Challenge yourself by drawing longer lines without stopping. You're on the right track!",
  ],
  "3": [
    "Impressive perspective work! Your understanding of depth is coming along well. Try to make your vanishing points more consistent - use a ruler if needed. Excellent effort!",
    "Great job with perspective! The depth in your drawing is clear. For your next attempt, focus on making parallel lines converge more accurately toward the vanishing point. Keep learning!",
    "Nice work on perspective basics! You're grasping the concept well. Practice with simpler forms first, then gradually add complexity. You're making great progress!",
  ],
  "4": [
    "Excellent shading! Your value transitions are smooth and show good understanding of light and shadow. Try creating more contrast between your darkest darks and lightest lights. Well done!",
    "Great shading work! I can see you understand how light affects form. For improvement, practice creating smoother gradients - blend your values more gradually. Keep practicing!",
    "Nice progress with shading! Your forms are starting to look three-dimensional. Focus on identifying your light source and being consistent with where shadows fall. You're improving!",
  ],
  "5": [
    "Good work on proportions! Your measurements are getting more accurate. Try comparing different parts of your subject to each other - this will help with accuracy. Keep it up!",
    "Nice job with proportions! I can see you're paying attention to relationships between elements. For improvement, practice measuring with your pencil before drawing. Great progress!",
    "Well done on proportions! Your understanding of scale is developing. Try breaking complex forms into simpler shapes first. You're on the right track!",
  ],
  "6": [
    "Excellent still life! Your composition shows good arrangement and observation skills. Try adding more detail to your shadows to create more depth. Great work!",
    "Great still life drawing! Your objects have good form and placement. For improvement, focus on making your edges sharper where objects overlap. Keep practicing!",
    "Nice work on the still life! Your observation skills are improving. Try varying your line weights to create more visual interest. You're making progress!",
  ],
  "7": [
    "Impressive portrait work! Your facial proportions are looking good. Try adding more detail to the eyes and mouth to bring more life to your portrait. Excellent effort!",
    "Great job on the portrait! You're capturing the basic structure well. For improvement, practice drawing individual features separately before combining them. Keep learning!",
    "Nice progress with portraits! Your understanding of facial structure is developing. Focus on the placement of features - eyes are usually halfway down the head. You're improving!",
  ],
  "8": [
    "Excellent landscape! Your sense of depth is clear with good foreground, middle ground, and background separation. Try adding more atmospheric perspective. Well done!",
    "Great landscape work! Your composition shows good understanding of space. For improvement, practice creating more texture variation between different elements. Keep practicing!",
    "Nice work on the landscape! Your depth is coming along well. Try using lighter values for distant objects to enhance the sense of depth. You're making progress!",
  ],
  "9": [
    "Impressive animal drawing! You've captured the form and gesture well. Try adding more texture to suggest fur or skin. Excellent work!",
    "Great job with the animal drawing! Your understanding of animal anatomy is developing. For improvement, practice drawing from life or photos to improve accuracy. Keep learning!",
    "Nice progress on animal drawing! Your forms are looking good. Focus on capturing the unique characteristics of the animal you're drawing. You're improving!",
  ],
  "10": [
    "Excellent gesture drawings! Your lines are fluid and capture movement well. Try making your gestures even more dynamic and expressive. Great work!",
    "Great gesture work! Your quick sketches show good understanding of form and motion. For improvement, practice drawing even faster to capture the essence. Keep practicing!",
    "Nice job with gestures! Your lines are becoming more confident. Try focusing on the action line first, then build the form around it. You're making progress!",
  ],
  "11": [
    "Impressive composition! Your use of the rule of thirds is effective. Try experimenting with different focal points to create more visual interest. Excellent effort!",
    "Great composition work! Your balance of elements is good. For improvement, practice creating stronger contrast between your main subject and background. Keep learning!",
    "Nice progress with composition! Your understanding of visual balance is developing. Try using leading lines to guide the viewer's eye. You're improving!",
  ],
  "12": [
    "Outstanding final project! You've successfully combined all the skills you've learned. This shows tremendous growth and dedication. Congratulations on completing the course!",
    "Excellent final project! Your comprehensive drawing demonstrates mastery of the fundamentals. You should be proud of your progress. Well done!",
    "Amazing work on your final project! You've shown great improvement throughout this journey. Keep practicing and continue to challenge yourself. Congratulations!",
  ],
};

export function generateMockFeedback(exercise: Exercise): string {
  const templates = feedbackTemplates[exercise.id] || [
    "Great work! Keep practicing and you'll continue to improve. Remember, every drawing is a learning opportunity!",
  ];

  // Randomly select one feedback template
  const randomIndex = Math.floor(Math.random() * templates.length);
  return templates[randomIndex];
}
