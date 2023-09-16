import { computed, useSignal } from "@preact/signals";
import { useRef, type TargetedEvent } from "preact/compat";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const loading = useSignal(false);
  const errors = useSignal<string[]>([]);
  const isSuccess = useSignal(false);

  const successMessage = computed(() => {
    if (isSuccess.value === false) return null;

    return (
      <div class="my-4 bg-green-500 p-4 text-white">
        <p>Your message has been sent!</p>
      </div>
    );
  });

  const errorMessages = computed(() => {
    if (errors.value.length === 0) return null;

    return (
      <div class="mt-10 bg-red-500 p-4 text-white xl:my-4">
        <ul>
          {errors.value.map((error) => (
            <li>{error}</li>
          ))}
        </ul>
      </div>
    );
  });

  const buttonText = computed(() =>
    loading.value ? <i class="las la-spinner animate-spin"></i> : "Send",
  );

  const onSubmitAsync = async (
    event: TargetedEvent<HTMLFormElement, Event>,
  ) => {
    event.preventDefault();

    if (!event.target) return;

    loading.value = true;
    errors.value = [];
    isSuccess.value = false;

    const form = event.target as HTMLFormElement;

    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    });

    const responseData = await response.json();

    if (response.ok === false) {
      if (responseData.errors !== undefined) {
        //@ts-ignore
        errors.value = responseData.errors.map((e) => e.message);
      } else {
        errors.value = ["An unknown error occurred."];
      }
    } else {
      isSuccess.value = true;
      clear();
    }

    loading.value = false;
  };

  const clear = () => {
    if (!formRef.current) return;
    errors.value = [];
    isSuccess.value = false;
    formRef.current.reset();
  };

  return (
    <>
      <form
        class="border-b-2 border-indigo-950 pb-10 xl:border-b-0 xl:border-r-2 xl:pb-0 xl:pr-10"
        action="https://formspree.io/f/matthew.hope396@outlook.com"
        method="POST"
        onSubmit={onSubmitAsync}
        ref={formRef}
      >
        <div class="grid grid-rows-2 pb-10">
          <label class="pb-2 text-xl text-indigo-950">Name</label>
          <input
            class="border-2 border-indigo-950 px-2"
            type="text"
            name="name"
          />
        </div>
        <div class="grid grid-rows-2 pb-10">
          <label class="pb-2 text-xl text-indigo-950">Email</label>
          <input
            class="border-2 border-indigo-950 px-2"
            type="email"
            name="email"
          />
        </div>
        <div class="grid pb-10">
          <label class="pb-2 text-xl text-indigo-950">Message</label>
          <textarea
            class="border-2 border-indigo-950 p-2"
            name="message"
            rows={10}
          ></textarea>
        </div>
        <div class="grid grid-cols-2">
          <button
            disabled={loading}
            class="mr-2 bg-indigo-950 px-4 py-2 text-white hover:bg-indigo-400 hover:text-white"
          >
            {buttonText}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              clear();
            }}
            class="ml-2 border-2 border-indigo-950 px-6 py-4 text-indigo-950 hover:border-indigo-400 hover:text-indigo-400"
          >
            Clear
          </button>
        </div>
        {errorMessages}
        {successMessage}
      </form>
    </>
  );
}
