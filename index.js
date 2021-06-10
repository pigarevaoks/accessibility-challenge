const exhibitionFilters = document.querySelectorAll(
  ".exhibitions__filter-item"
);
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
    filter.classList.remove("active");
    filter.setAttribute("aria-selected", "false");
  });
  currentFilter.classList.add("active");
  currentFilter.setAttribute("aria-selected", "true");

  exhibitionContainers.forEach((container) => {
    const filterBy = currentFilter.dataset.id;
    const currentContainer = container.dataset.id;
    if (filterBy === currentContainer) {
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
    }
  });
};

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
    tab.classList.remove("active");
    tab.setAttribute("aria-selected", "false");
  });
  museumContents.forEach((content) => content.classList.remove("active"));

  currentTab.classList.add("active");
  currentTab.setAttribute("aria-selected", "true");
  const getCurrentId = currentTab.getAttribute("aria-controls");
  const currentContent = document.getElementById(getCurrentId);
  currentContent.classList.add("active");
};

const openDialogButton = document.querySelector("#dialog-button-open");
const closeDialogButton = document.querySelector("#dialog-button-close");
const overlay = document.querySelector("#dialog-overlay");
const dialogWindow = document.querySelector("#dialog");
const submitDialogButton = document.querySelector("#dialog-button-submit");
const hiddenClass = "hidden";

openDialogButton.addEventListener("click", () => {
  [overlay, dialogWindow].forEach((el) => el.classList.remove(hiddenClass));
  closeDialogButton.focus();
});

closeDialogButton.addEventListener("click", () => {
  [overlay, dialogWindow].forEach((el) => el.classList.add(hiddenClass));
  openDialogButton.focus();
});

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
  }
});
