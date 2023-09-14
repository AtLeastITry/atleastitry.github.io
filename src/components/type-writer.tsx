import { useSignal, effect, useComputed } from "@preact/signals";
import { useEffect } from "preact/hooks";

type TypeWriterProps = {
  text?: string;
  delay?: number;
  textSuffix?: string[];
};

export default function TypeWriter({
  text,
  textSuffix,
  delay,
}: TypeWriterProps) {
  const currentText = useSignal("");
  const extraText = useSignal("");
  const blinkCursor = useComputed(() => 
  {
    if (currentText === undefined || textSuffix === undefined) return;

    if (text !== undefined && currentText.value.length === (text?.length ?? 0) && textSuffix !== undefined) {
      return (<span class="animate-blink">|</span>)
    }

    return (<span>|</span>)
  });

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const writeSuffix = async () => {
      if (textSuffix === undefined) return;

      for (let i = 0; i < textSuffix.length; i++) {
        for (let j = 0; j < textSuffix[i].length; j++) {
          extraText.value = extraText.value + textSuffix[i][j];
          await wait(delay ?? 100);
        }

        for (let j = extraText.value.length; j > 0; j--) {
          extraText.value = extraText.value.slice(0, -1);
          await wait(delay ?? 100);
        }
      }

      writeSuffix();
    };

    const writeText = async () => {
      if (text !== undefined) {
        for (let i = 0; i < text.length; i++) {
          currentText.value = currentText.value + text[i];
          await wait(delay ?? 80);
        }
      }

      writeSuffix();
    };

    writeText();
  }, []);

  return (
    <>
      <span class="text-2xl text-white">
        <span class="">
          {currentText}
          {extraText}
        </span>
        {blinkCursor}
      </span>
    </>
  );
}
