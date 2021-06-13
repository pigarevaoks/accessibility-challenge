const hiddenClass = "hidden";
const activeClass = "active";
const overflowHidden = "overflowHidden";
const error = "error";

// carousel
const slides = Array.from(document.querySelectorAll(".carousel__slide-item"));
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const carouselButtons = document.querySelectorAll(".carousel__controls-item");
const slideIndex = [1, 1];

plusSlides = (n, no) => showSlides((slideIndex[no] += n), no);

showSlides = (n, no) => {
  if (n > slides.length) {
    slideIndex[no] = 1;
  }
  if (n < 1) {
    slideIndex[no] = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].querySelector(".carousel__link").setAttribute("tab-index", "-1");
  }
  slides[slideIndex[no] - 1].style.display = "block";
  slides[slideIndex[no] - 1]
    .querySelector(".carousel__link")
    .setAttribute("tab-index", "1");
};

previousButton.addEventListener("click", () => plusSlides(-1, 0));
nextButton.addEventListener("click", () => plusSlides(1, 0));

// filters
const exhibitionFilters = document.querySelectorAll(".exhibitions__filter");
const exhibitionContainers = document.querySelectorAll(
  ".exhibition__list-item"
);

exhibitionFilters.forEach((filter) => {
  filter.addEventListener("click", (event) => {
    event.preventDefault();
    filterChange(event.target);
  });
});

filterChange = (currentFilter) => {
  exhibitionFilters.forEach((filter) => {
    filter.classList.remove(activeClass);
    filter.setAttribute("selected", "false");
  });

  exhibitionContainers.forEach((container) => {
    const filterBy = currentFilter.dataset.id;
    const currentContainer = container.dataset.id;
    if (filterBy === "all" || filterBy === currentContainer) {
      container.classList.remove(hiddenClass);
    } else {
      container.classList.add(hiddenClass);
    }
  });
  currentFilter.classList.add(activeClass);
  currentFilter.setAttribute("selected", "true");
};

// tabs
const museumTabs = document.querySelectorAll(".museum__tab");
const museumContents = document.querySelectorAll(".museum__content");

museumTabs.forEach((tab) => {
  tab.addEventListener("click", (event) => {
    event.preventDefault();
    tabChange(event.target);
  });
});

tabChange = (currentTab) => {
  museumTabs.forEach((tab) => {
    tab.classList.remove(activeClass);
    tab.setAttribute("aria-selected", "false");
  });
  museumContents.forEach((content) => content.classList.remove(activeClass));

  currentTab.classList.add(activeClass);
  currentTab.setAttribute("aria-selected", "true");
  const getCurrentId = currentTab.getAttribute("aria-controls");
  const currentContent = document.getElementById(getCurrentId);
  currentContent.classList.add(activeClass);
};

// dialog
const body = document.querySelector("body");
const dialog = document.querySelector("#dialog");
const dialogForm = document.querySelector(".dialog__form");
const openDialogButton = document.querySelector("#dialog-button-open");
const closeDialogButton = document.querySelector("#dialog-button-close");
const submitDialogButton = document.querySelector("#dialog-button-submit");

openDialogButton.addEventListener("click", () => {
  dialog.classList.remove(hiddenClass);
  body.classList.add(overflowHidden);
  closeDialogButton.focus();
});

closeDialogButton.addEventListener("click", () => {
  dialog.classList.add(hiddenClass);
  body.classList.remove(overflowHidden);
  openDialogButton.focus();
});

submitDialogButton.addEventListener("click", (event) => {
  const inputs = Array.from(document.querySelectorAll(".dialog__form-input"));

  if (inputs.find((input) => !input.checkValidity())) {
    event.preventDefault();
  } else {
    document.getElementById("formInstruction").setAttribute("role", "alert");
    closeDialogButton.click();
  }

  for (let input of inputs) {
    const statusField = document.querySelector(
      `.dialog__form-status#${input.id}-error`
    );
    if (!input.checkValidity()) {
      statusField.innerHTML = input.validationMessage;
      input.classList.add(error);
      statusField.classList.remove("ok");
    } else {
      statusField.innerHTML = "Поле заполнено корректно";
      input.classList.remove(error);
      statusField.classList.add("ok");
    }
  }
});

// keys events
onNextElement = (elements, index) => {
  const nextIndex = index === elements.length - 1 ? 0 : index + 1;

  elements.forEach((element) => element.setAttribute("tab-index", "-1"));
  const currentElement = elements[nextIndex];
  currentElement.setAttribute("tab-index", "0");
  currentElement.focus();
};

onPrevElement = (elements, index) => {
  const prevIndex = index === 0 ? elements.length - 1 : index - 1;

  elements.forEach((element) => element.setAttribute("tab-index", "-1"));
  const currentElement = elements[prevIndex];
  currentElement.setAttribute("tab-index", "0");
  currentElement.focus();
};

window.addEventListener("keydown", (event) => {
  const { code, shiftKey } = event;

  switch (code) {
    case "Escape": {
      if (!overlay.classList.contains(hiddenClass)) {
        [overlay, dialogWindow].forEach((el) => el.classList.add(hiddenClass));
        openDialogButton.focus();
      }
      break;
    }
    case "Tab": {
      if (shiftKey && document.activeElement === closeDialogButton) {
        event.preventDefault();
        submitDialogButton.focus();
      } else if (!shiftKey && document.activeElement === submitDialogButton) {
        event.preventDefault();
        closeDialogButton.focus();
      }
      break;
    }
    case "ArrowRight": {
      const tabIndex = Array.from(museumTabs).indexOf(document.activeElement);
      if (tabIndex !== -1) {
        onNextElement(museumTabs, tabIndex);
        break;
      }

      const filterIndex = Array.from(exhibitionFilters).indexOf(
        document.activeElement
      );
      if (filterIndex !== -1) {
        onNextElement(exhibitionFilters, filterIndex);
        break;
      }
      const carouselIndex = Array.from(carouselButtons).indexOf(
        document.activeElement
      );
      if (carouselIndex !== -1) {
        onNextElement(carouselButtons, carouselIndex);
        plusSlides(1, 0);
        // nextButton.addEventListener("click", () => plusSlides(1, 0));
        break;
      }
      break;
    }
    case "ArrowLeft": {
      const tabIndex = Array.from(museumTabs).indexOf(document.activeElement);
      if (tabIndex !== -1) {
        onPrevElement(museumTabs, tabIndex);
        break;
      }

      const filterIndex = Array.from(exhibitionFilters).indexOf(
        document.activeElement
      );
      if (filterIndex !== -1) {
        onPrevElement(exhibitionFilters, filterIndex);
        break;
      }
      const carouselIndex = Array.from(carouselButtons).indexOf(
        document.activeElement
      );
      if (previousButton.activeElement !== -1) {
        onPrevElement(carouselButtons, carouselIndex);
        plusSlides(-1, 0);
        // previousButton.addEventListener("click", () => plusSlides(-1, 0));
        break;
      }
      break;
    }
  }
});
