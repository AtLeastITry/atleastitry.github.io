import { computed, useSignal } from "@preact/signals";

export function NavMenu() {
  const menuVisible = useSignal(false);
  const toggleMenu = () => (menuVisible.value = !menuVisible.value);

  const mobileMenu = computed(() => {
    if (menuVisible.value === true) {
      return (
        <>
          <span class="text-end align-middle text-2xl xl:hidden">
            <i
              onClick={toggleMenu}
              class="las la-bars cursor-pointer text-indigo-400"
            ></i>
          </span>
          <div class="col-span-2 mt-10 grid grid-cols-1 border-t-2 pt-10 xl:hidden">
            <span class="text-center">
              <a
                href="/matt-h-resume.pdf"
                target="_blank"
                class="inline-block border-2 border-white px-6 py-4 text-white hover:border-indigo-400 hover:text-indigo-400"
              >
                Download my CV
              </a>
            </span>
            <span class="pt-10 text-center">
              <a href="/#portfolio" class="text-white hover:text-indigo-400">
                Portflio
              </a>
            </span>
            <span class="pt-10 text-center">
              <a href="/blog" class="text-white hover:text-indigo-400">
                Blog
              </a>
            </span>
            <span class="pt-10 text-center">
              <a href="/career" class="text-white hover:text-indigo-400">
                Career
              </a>
            </span>
          </div>
        </>
      );
    }

    return (
      <>
        <span class="text-end align-middle text-2xl xl:hidden">
          <i
            onClick={toggleMenu}
            class="las la-bars cursor-pointer text-white hover:text-indigo-400"
          ></i>
        </span>
      </>
    );
  });

  return (
    <>
      {mobileMenu}
      <div class="hidden grid-cols-5 xl:grid">
        <span class="col-span-2 align-middle">
          <a
            href="/matt-h-resume.pdf"
            target="_blank"
            class="inline-block border-2 border-white px-6 py-4 text-white hover:border-indigo-400 hover:text-indigo-400"
          >
            Download my CV
          </a>
        </span>
        <span class="pt-4 text-end">
          <a href="/#portfolio" class="text-white hover:text-indigo-400">
            Portflio
          </a>
        </span>
        <span class="pt-4 text-end">
          <a href="/blog" class="text-white hover:text-indigo-400">
            Blog
          </a>
        </span>
        <span class="pt-4 text-end">
          <a href="/career" class="text-white hover:text-indigo-400">
            Career
          </a>
        </span>
      </div>
    </>
  );
}
