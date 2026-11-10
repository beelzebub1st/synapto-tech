import { QuizFlow } from "@/components/marketing/quiz-flow";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Find your package",
  "Take the Synapto Tech pathfinder quiz — five questions to a scored Presence, Product, or System recommendation.",
  { path: "/start" }
);

export default function StartQuizPage() {
  return <QuizFlow />;
}
