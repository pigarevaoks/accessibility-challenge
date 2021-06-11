const hiddenClass = "hidden";
const activeClass = "active";

// carousel
const slides = Array.from(document.querySelectorAll(".carousel__slide-item"));
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
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
    slides[i].setAttribute("aria-hidden", "true");
  }
  slides[slideIndex[no] - 1].style.display = "block";
  slides[slideIndex[no] - 1].setAttribute("aria-hidden", "false");
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
    filter.setAttribute("aria-selected", "false");
  });
  currentFilter.classList.add(activeClass);
  currentFilter.setAttribute("aria-selected", "true");

  exhibitionContainers.forEach((container) => {
    const filterBy = currentFilter.dataset.id;
    const currentContainer = container.dataset.id;
    if (filterBy === currentContainer) {
      container.classList.remove(hiddenClass);
    } else {
      container.classList.add(hiddenClass);
    }
  });
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
const dialogWindow = document.querySelector("#dialog");
const openDialogButton = document.querySelector("#dialog-button-open");
const closeDialogButton = dialogWindow.firstChild.nextSibling;
const submitDialogButton = document.querySelector("#dialog-button-submit");
const overlay = document.querySelector("#dialog-overlay");

openDialogButton.addEventListener("click", () => {
  [overlay, dialogWindow].forEach((el) => el.classList.remove(hiddenClass));
  closeDialogButton.focus();
});

closeDialogButton.addEventListener("click", () => {
  [overlay, dialogWindow].forEach((el) => el.classList.add(hiddenClass));
  openDialogButton.focus();
});

// keys events
onNextElement = (elements, index) => {
  const nextIndex = index === elements.length - 1 ? 0 : index + 1;

  elements.forEach((element) => element.setAttribute("tabindex", "-1"));
  const currentElement = elements[nextIndex];
  currentElement.setAttribute("tabindex", "0");
  currentElement.focus();
};
onPrevElement = (elements, index) => {
  const prevIndex = index === 0 ? elements.length - 1 : index - 1;

  elements.forEach((element) => element.setAttribute("tabindex", "-1"));
  const currentElement = elements[prevIndex];
  currentElement.setAttribute("tabindex", "0");
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
      break;
    }
  }
});
