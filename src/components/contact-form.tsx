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

    if (!event.target || isSuccess.value === true) return;

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
      clear();
      isSuccess.value = true;
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
      <div class="rounded-lg border border-white/10 bg-indigo-950/60 p-6 shadow-2xl backdrop-blur xl:border-b-0 w-full md:max-w-[48rem]">
        <form
          class=""
          action="https://formspree.io/f/xqkryvko"
          method="POST"
          onSubmit={onSubmitAsync}
          ref={formRef}
        >
          <div class="grid grid-rows-2 pb-10">
            <label class="pb-2 text-xl text-white">Name</label>
            <input
              class="bg-indigo-950 px-2 text-white rounded-lg w-full"
              type="text"
              name="name"
            />
          </div>
          <div class="grid grid-rows-2 pb-10">
            <label class="pb-2 text-xl text-white">Email</label>
            <input
              class="bg-indigo-950 px-2 text-white rounded-lg w-full"
              type="email"
              name="email"
            />
          </div>
          <div class="grid pb-10">
            <label class="pb-2 text-xl text-white">Message</label>
            <textarea
              class="bg-indigo-950 p-2 text-white rounded-lg w-full"
              name="message"
              rows={10}
            ></textarea>
          </div>
          <div class="grid grid-cols-2">
            <button
              disabled={loading}
              class="cursor-pointer border-white text-white rounded-lg mr-2 border-2 px-6 py-4 hover:border-indigo-400 hover:text-indigo-400"
            >
              {buttonText}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                clear();
              }}
              class="cursor-pointer bg-indigo-950 mr-2 px-4 py-2 rounded-lg text-white hover:bg-indigo-400 hover:text-white"
            >
              Clear
            </button>
          </div>
          {errorMessages}
          {successMessage}
        </form>
      </div>
    </>
  );
}
