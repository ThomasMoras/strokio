import type { Exercise } from "../model/exercise";

export const exercises: Exercise[] = [
  {
    id: "1",
    title: "Basic Shapes",
    description: "Practice drawing circles, squares, triangles, and rectangles. Focus on clean lines and consistent shapes.",
    difficulty: 1,
    estimatedTime: "15 minutes",
  },
  {
    id: "2",
    title: "Line Quality and Control",
    description: "Draw straight lines, curved lines, and varying line weights. Practice control and consistency.",
    difficulty: 1,
    estimatedTime: "20 minutes",
  },
  {
    id: "3",
    title: "Perspective Basics",
    description: "Learn one-point and two-point perspective. Draw simple boxes and buildings in perspective.",
    difficulty: 2,
    estimatedTime: "30 minutes",
  },
  {
    id: "4",
    title: "Shading Fundamentals",
    description: "Practice creating value scales and shading basic forms. Understand light and shadow.",
    difficulty: 2,
    estimatedTime: "25 minutes",
  },
  {
    id: "5",
    title: "Proportions",
    description: "Draw objects with correct proportions. Practice measuring and comparing relationships.",
    difficulty: 2,
    estimatedTime: "30 minutes",
  },
  {
    id: "6",
    title: "Still Life Basics",
    description: "Arrange and draw simple objects like fruit or cups. Focus on composition and observation.",
    difficulty: 2,
    estimatedTime: "45 minutes",
  },
  {
    id: "7",
    title: "Portrait Basics",
    description: "Learn facial proportions and draw a simple portrait. Focus on placement of features.",
    difficulty: 3,
    estimatedTime: "60 minutes",
  },
  {
    id: "8",
    title: "Landscape Basics",
    description: "Draw a simple landscape with foreground, middle ground, and background. Practice depth.",
    difficulty: 2,
    estimatedTime: "40 minutes",
  },
  {
    id: "9",
    title: "Animal Drawing",
    description: "Draw an animal focusing on form and gesture. Capture the essence and movement.",
    difficulty: 3,
    estimatedTime: "50 minutes",
  },
  {
    id: "10",
    title: "Gesture Drawing",
    description: "Quick sketches capturing movement and pose. Practice fluid, expressive lines.",
    difficulty: 2,
    estimatedTime: "20 minutes",
  },
  {
    id: "11",
    title: "Composition",
    description: "Create a drawing with strong composition. Use rule of thirds and balance elements.",
    difficulty: 3,
    estimatedTime: "60 minutes",
  },
  {
    id: "12",
    title: "Final Project",
    description: "Combine all learned skills into one comprehensive drawing. Show your progress!",
    difficulty: 3,
    estimatedTime: "90 minutes",
  },
];

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find((ex) => ex.id === id);
}
