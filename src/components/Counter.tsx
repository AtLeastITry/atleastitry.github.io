import { useSignal } from "@preact/signals";

export default function Counter() {
  const counter = useSignal(0);
  const increment = () => counter.value++;

  return (
    <>
      <button class="rounded bg-indigo-600 p-3 text-white" onClick={increment}>
        Clicked {counter} times
      </button>
    </>
  );
}
