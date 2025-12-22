import Navigation from "@/navigation";
import { Stack } from "expo-router";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Navigation />
    </>
  );
}
