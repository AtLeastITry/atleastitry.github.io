import { useSignal, effect } from "@preact/signals";
import { useEffect } from "preact/hooks";

type TypeWriterProps = {
  text: string;
  delay?: number;
  infinite?: boolean;
};

export default function TypeWriter({ text, delay, infinite }: TypeWriterProps) {
  const currentIndex = useSignal(0);
  const currentText = useSignal("");

  effect(() => {
    let timeout = 0;

    if (currentIndex.value <= text.length) {
      timeout = setTimeout(() => {
        currentText.value = currentText.value + (text[currentIndex.value] ?? "");
        currentIndex.value = currentIndex.value + 1;
      }, delay ?? 80);
    } else if (infinite) {
      currentIndex.value = 0;
      currentText.value = "";
    }

    return () => clearTimeout(timeout);
  });

  return (<><span class="text-white underline text-6xl">{currentText}</span></>);
}
