const itemsBody = document.getElementById("itemsBody");
const addRowBtn = document.getElementById("addRowBtn");
const itemRowTemplate = document.getElementById("itemRowTemplate");
const totalSumEl = document.getElementById("totalSum");
const downloadPdfBtn = document.getElementById("downloadPdfBtn");
const resetBtn = document.getElementById("resetBtn");
const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("langToggle");

const THEME_STORAGE_KEY = "kp-theme";
const LANG_STORAGE_KEY = "kp-lang";
const COMPANY_STORAGE_KEY = "kp-company-draft";

const translations = {
    ru: {
        appTitle: "Генератор коммерческих предложений",
        appSubtitle: "Создайте КП за пару минут и скачайте в PDF",
        editorTitle: "Редактор КП",
        companyData: "Данные компании",
        companyName: "Название компании",
        companyPhone: "Телефон",
        companyEmail: "E-mail",
        companyInfo: "Адрес / реквизиты (опционально)",
        clientData: "Данные клиента",
        clientName: "Кому (название компании / ФИО)",
        clientPhone: "Телефон",
        clientEmail: "E-mail",
        positionsTitle: "Позиции КП",
        addRow: "+ Добавить строку",
        colName: "Наименование услуги / работы",
        colQty: "Кол-во",
        colUnit: "Ед.",
        priceLabel: "Цена",
        sumLabel: "Сумма",
        total: "Итого:",
        conditionsTitle: "Условия и примечания",
        validUntil: "Срок действия КП",
        paymentTerms: "Условия оплаты",
        notes: "Примечания",
        downloadPdf: "Скачать КП в PDF",
        resetForm: "Очистить форму",
        previewTitle: "Предпросмотр",
        previewHint: "Так будет выглядеть в PDF",
        itemsLabel: "Перечень работ и услуг",
        conditionsLabel: "Условия",
        regardsLabel: "С уважением,",
        fillCompany: "Заполните название компании",
        fillClient: "Укажите клиента (для кого КП)",
        addPosition: "Добавьте хотя бы одну позицию",
        pdfError: "Не удалось сформировать PDF. Попробуйте ещё раз.",
        pdfLoadError: "Библиотека html2pdf не загрузилась. Попробуйте открыть файл через локальный сервер (http://127.0.0.1:8080)",
        invalidDate: "—",
        paymentPlaceholder: "Напр.: 100% предоплата / по договору",
        notesPlaceholder: "Дополнительная информация, гарантия, доставка и др.",
        datePlaceholder: "дд.мм.гггг",
        companyPlaceholder: "ООО «Название»",
        phonePlaceholder: "+7 (XXX) XXX-XX-XX",
        emailPlaceholder: "example@company.ru",
        companyInfoPlaceholder: "Юридический адрес, ИНН и др.",
        clientPlaceholder: "Заказчик",
        clientPhonePlaceholder: "+7 (XXX) XXX-XX-XX",
        clientEmailPlaceholder: "client@example.ru",
        servicePlaceholder: "Услуга или работа",
        unitPlaceholder: "шт.",
        pricePlaceholder: "0",
        qtyPlaceholder: "1",
        removeRowTitle: "Удалить строку",
        calendarAriaLabel: "Открыть календарь",
        themeAriaLabel: "Переключить тему",
        langAriaLabel: "Переключить язык",
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        currency: "₽",
        dateFormat: "ru-RU",
        companyNamePreview: "Название вашей компании",
        clientNamePreview: "Укажите получателя КП",
        pdfTitle: "Коммерческое предложение",
        dateLabel: "Дата:",
        validUntilLabel: "Действует до:",
        forWhomLabel: "Для кого",
        itemsLabelHeader: "Перечень работ и услуг",
        conditionsLabelHeader: "Условия",
        totalLabel: "Итого:",
        colNumber: "#",
        colNamePreview: "Наименование",
    },
    en: {
        appTitle: "Commercial Proposal Generator",
        appSubtitle: "Create a proposal in minutes and download as PDF",
        editorTitle: "Proposal Editor",
        companyData: "Company Details",
        companyName: "Company Name",
        companyPhone: "Phone",
        companyEmail: "E-mail",
        companyInfo: "Address / Details (optional)",
        clientData: "Client Details",
        clientName: "To (Company Name / Name)",
        clientPhone: "Phone",
        clientEmail: "E-mail",
        positionsTitle: "Proposal Items",
        addRow: "+ Add Row",
        colName: "Service / Work Description",
        colQty: "Qty",
        colUnit: "Unit",
        priceLabel: "Price",
        sumLabel: "Total",
        total: "Total:",
        conditionsTitle: "Terms & Notes",
        validUntil: "Valid Until",
        paymentTerms: "Payment Terms",
        notes: "Notes",
        downloadPdf: "Download PDF",
        resetForm: "Clear Form",
        previewTitle: "Preview",
        previewHint: "This is how it will look in PDF",
        itemsLabel: "Items List",
        conditionsLabel: "Terms",
        regardsLabel: "Best regards,",
        fillCompany: "Fill in company name",
        fillClient: "Specify client (for whom the proposal)",
        addPosition: "Add at least one item",
        pdfError: "Failed to generate PDF. Please try again.",
        pdfLoadError: "html2pdf library not loaded. Try opening via local server (http://127.0.0.1:8080)",
        invalidDate: "—",
        paymentPlaceholder: "e.g. 100% prepayment / per contract",
        notesPlaceholder: "Additional info, warranty, delivery, etc.",
        datePlaceholder: "mm/dd/yyyy",
        companyPlaceholder: "LLC «Name»",
        phonePlaceholder: "+1 (XXX) XXX-XX-XX",
        emailPlaceholder: "example@company.com",
        companyInfoPlaceholder: "Legal address, Tax ID, etc.",
        clientPlaceholder: "Client",
        clientPhonePlaceholder: "+1 (XXX) XXX-XX-XX",
        clientEmailPlaceholder: "client@example.com",
        servicePlaceholder: "Service or work",
        unitPlaceholder: "pcs.",
        pricePlaceholder: "0",
        qtyPlaceholder: "1",
        removeRowTitle: "Remove row",
        calendarAriaLabel: "Open calendar",
        themeAriaLabel: "Toggle theme",
        langAriaLabel: "Toggle language",
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        currency: "$",
        dateFormat: "en-US",
        companyNamePreview: "Your Company Name",
        clientNamePreview: "Specify proposal recipient",
        pdfTitle: "Commercial Proposal",
        dateLabel: "Date:",
        validUntilLabel: "Valid Until:",
        forWhomLabel: "For Whom",
        itemsLabelHeader: "Items List",
        conditionsLabelHeader: "Terms",
        totalLabel: "Total:",
        colNumber: "#",
        colNamePreview: "Description",
    }
};

let currentLang = "ru";

const companyNameInput = document.getElementById("companyName");
const companyPhoneInput = document.getElementById("companyPhone");
const companyEmailInput = document.getElementById("companyEmail");
const companyInfoInput = document.getElementById("companyInfo");
const clientNameInput = document.getElementById("clientName");
const clientPhoneInput = document.getElementById("clientPhone");
const clientEmailInput = document.getElementById("clientEmail");
const validUntilInput = document.getElementById("validUntil");
const validUntilDisplay = document.getElementById("validUntilDisplay");
const dateFieldWrapper = document.getElementById("dateFieldWrapper");
const calendarPopup = document.getElementById("calendarPopup");
const calendarTitle = document.getElementById("calendarTitle");
const calendarDays = document.getElementById("calendarDays");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const paymentTermsInput = document.getElementById("paymentTerms");
const notesInput = document.getElementById("notes");

let calendarDate = new Date();
let selectedDate = null;

const previewCompanyName = document.getElementById("previewCompanyName");
const previewCompanyPhone = document.getElementById("previewCompanyPhone");
const previewCompanyEmail = document.getElementById("previewCompanyEmail");
const previewCompanyInfo = document.getElementById("previewCompanyInfo");
const previewFooterCompany = document.getElementById("previewFooterCompany");
const previewClientName = document.getElementById("previewClientName");
const previewClientPhone = document.getElementById("previewClientPhone");
const previewClientEmail = document.getElementById("previewClientEmail");
const previewDate = document.getElementById("previewDate");
const previewValidUntil = document.getElementById("previewValidUntil");
const previewItemsBody = document.getElementById("previewItemsBody");
const previewTotalSum = document.getElementById("previewTotalSum");
const previewPaymentTerms = document.getElementById("previewPaymentTerms");
const previewNotes = document.getElementById("previewNotes");
const previewConditions = document.getElementById("previewConditions");

function getTranslation(key) {
    return (translations[currentLang] && translations[currentLang][key]) || (translations.ru && translations.ru[key]) || key;
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    document.documentElement.setAttribute("lang", lang);
    updateAllTexts();
    updateLangToggle();
}

function toggleLanguage() {
    const newLang = currentLang === "ru" ? "en" : "ru";
    setLanguage(newLang);
}

function updateLangToggle() {
    if (langToggle) {
        const langCurrent = document.getElementById("langCurrent");
        if (langCurrent) {
            langCurrent.textContent = currentLang.toUpperCase();
        }
    }
}

function updateAllTexts() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        const translation = getTranslation(key);
        if (el.children.length === 0) {
            el.textContent = translation;
        }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (key) el.placeholder = getTranslation(key);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(el => {
        const key = el.getAttribute("data-i18n-aria");
        if (key) el.setAttribute("aria-label", getTranslation(key));
    });
    document.querySelectorAll("[data-i18n-title]").forEach(el => {
        const key = el.getAttribute("data-i18n-title");
        if (key) el.title = getTranslation(key);
    });
    if (calendarPopup && calendarPopup.classList.contains("open")) {
        renderCalendar();
    }
    updateDate();
    updateDateFieldDisplay();
    updateRowSums();
    updatePreview();
}

function updateDateFieldDisplay() {
    if (!validUntilDisplay) return;
    const val = validUntilInput ? validUntilInput.value : "";
    if (!val) {
        validUntilDisplay.value = "";
        return;
    }
    const d = fromISODate(val);
    if (d) {
        validUntilDisplay.value = d.toLocaleDateString(getTranslation("dateFormat"));
    } else {
        validUntilDisplay.value = val;
    }
}

function loadCompanyData() {
    try {
        const saved = localStorage.getItem(COMPANY_STORAGE_KEY);
        if (!saved) return;
        const data = JSON.parse(saved);
        if (companyNameInput && data.companyName !== undefined) companyNameInput.value = data.companyName;
        if (companyPhoneInput && data.companyPhone !== undefined) companyPhoneInput.value = data.companyPhone;
        if (companyEmailInput && data.companyEmail !== undefined) companyEmailInput.value = data.companyEmail;
        if (companyInfoInput && data.companyInfo !== undefined) companyInfoInput.value = data.companyInfo;
    } catch (e) {
        // ignore
    }
}

function saveCompanyData() {
    try {
        const data = {
            companyName: companyNameInput ? companyNameInput.value : "",
            companyPhone: companyPhoneInput ? companyPhoneInput.value : "",
            companyEmail: companyEmailInput ? companyEmailInput.value : "",
            companyInfo: companyInfoInput ? companyInfoInput.value : ""
        };
        localStorage.setItem(COMPANY_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        // ignore
    }
}

function initLanguage() {
    const savedLang = localStorage.getItem(LANG_STORAGE_KEY);
    const prefersRu = navigator.language && navigator.language.startsWith("ru");
    currentLang = savedLang || (prefersRu ? "ru" : "en");
    document.documentElement.setAttribute("lang", currentLang);
    updateLangToggle();
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
}

function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = savedTheme || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
}

if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
if (langToggle) langToggle.addEventListener("click", toggleLanguage);

initTheme();
initLanguage();

function parseNumber(val) {
    if (!val) return 0;
    const normalized = val.toString().replace(",", ".");
    const num = parseFloat(normalized);
    return isNaN(num) ? 0 : num;
}

function formatCurrency(value) {
    const num = typeof value === "number" && !isNaN(value) ? value : 0;
    return `${new Intl.NumberFormat(getTranslation("dateFormat")).format(Math.max(num, 0))} ${getTranslation("currency")}`;
}

function updateRowSums() {
    if (!itemsBody) return;
    const rows = itemsBody.querySelectorAll(".item-row");
    rows.forEach(row => {
        const qtyInput = row.querySelector(".item-input--qty");
        const priceInput = row.querySelector(".item-input--price");
        const sumEl = row.querySelector(".item-sum");
        const qty = parseNumber(qtyInput && qtyInput.value);
        const price = parseNumber(priceInput && priceInput.value);
        const sum = qty * price;
        if (sumEl) sumEl.textContent = formatCurrency(sum);
    });
}

function setText(el, value, placeholder = "") {
    if (!el) return;
    const text = typeof value === "string" ? value.trim() : "";
    if (text === "") {
        if (placeholder === "") {
            el.textContent = "";
            el.style.display = "none";
            return;
        }
        el.textContent = placeholder;
        el.style.display = "block";
        return;
    }
    el.textContent = text;
    el.style.display = "block";
}

function updateDate() {
    const now = new Date();
    if (previewDate) previewDate.textContent = now.toLocaleDateString(getTranslation("dateFormat"));
}

function createRow() {
    if (!itemRowTemplate || !itemsBody) return;
    const fragment = itemRowTemplate.content.cloneNode(true);
    const row = fragment.querySelector(".item-row");
    if (!row) return;

    const nameInput = row.querySelector(".item-input--name");
    const qtyInput = row.querySelector(".item-input--qty");
    const unitInput = row.querySelector(".item-input--unit");
    const priceInput = row.querySelector(".item-input--price");
    const sumEl = row.querySelector(".item-sum");
    const removeBtn = row.querySelector(".remove-row");

    const update = () => {
        const qty = parseNumber(qtyInput && qtyInput.value);
        const price = parseNumber(priceInput && priceInput.value);
        const sum = qty * price;
        if (sumEl) sumEl.textContent = formatCurrency(sum);
        updatePreview();
    };

    if (nameInput) nameInput.addEventListener("input", updatePreview);
    if (unitInput) unitInput.addEventListener("input", updatePreview);
    if (qtyInput) qtyInput.addEventListener("input", update);
    if (priceInput) priceInput.addEventListener("input", update);
    if (removeBtn) {
        removeBtn.addEventListener("click", () => {
            row.remove();
            updatePreview();
        });
    }

    itemsBody.appendChild(row);
    update();
}

function updatePreview() {
    if (!previewItemsBody) return;

    const companyName = companyNameInput ? companyNameInput.value : "";
    const companyPhone = companyPhoneInput ? companyPhoneInput.value : "";
    const companyEmail = companyEmailInput ? companyEmailInput.value : "";
    const companyInfo = companyInfoInput ? companyInfoInput.value : "";

    if (previewCompanyName) previewCompanyName.textContent = companyName.trim() === "" ? getTranslation("companyNamePreview") : companyName;
    if (previewFooterCompany) previewFooterCompany.textContent = companyName.trim() === "" ? getTranslation("companyNamePreview") : companyName;

    setText(previewCompanyPhone, companyPhone);
    setText(previewCompanyEmail, companyEmail);
    setText(previewCompanyInfo, companyInfo);

    const clientName = clientNameInput ? clientNameInput.value : "";
    const clientPhone = clientPhoneInput ? clientPhoneInput.value : "";
    const clientEmail = clientEmailInput ? clientEmailInput.value : "";

    if (previewClientName) previewClientName.textContent = clientName.trim() === "" ? getTranslation("clientNamePreview") : clientName;
    setText(previewClientPhone, clientPhone);
    setText(previewClientEmail, clientEmail);

    const validUntil = validUntilInput ? validUntilInput.value : "";
    if (previewValidUntil) {
        if (validUntil.trim() === "") {
            previewValidUntil.textContent = getTranslation("invalidDate");
        } else {
            try {
                const d = new Date(validUntil + "T00:00:00");
                previewValidUntil.textContent = isNaN(d.getTime()) ? validUntil : d.toLocaleDateString(getTranslation("dateFormat"));
            } catch (e) {
                previewValidUntil.textContent = validUntil;
            }
        }
    }

    const paymentTerms = paymentTermsInput ? paymentTermsInput.value : "";
    const notes = notesInput ? notesInput.value : "";

    setText(previewPaymentTerms, paymentTerms);
    setText(previewNotes, notes);

    if (previewConditions) {
        if (paymentTerms.trim() === "" && notes.trim() === "") {
            previewConditions.style.display = "none";
        } else {
            previewConditions.style.display = "flex";
        }
    }

    previewItemsBody.innerHTML = "";
    let total = 0;
    const rows = itemsBody ? itemsBody.querySelectorAll(".item-row") : [];

    rows.forEach((row, index) => {
        const nameInputEl = row.querySelector(".item-input--name");
        const qtyInputEl = row.querySelector(".item-input--qty");
        const unitInputEl = row.querySelector(".item-input--unit");
        const priceInputEl = row.querySelector(".item-input--price");

        const name = nameInputEl ? nameInputEl.value.trim() : "";
        const qty = parseNumber(qtyInputEl && qtyInputEl.value);
        const unit = unitInputEl ? unitInputEl.value.trim() : "";
        const price = parseNumber(priceInputEl && priceInputEl.value);
        const sum = qty * price;
        total += sum;

        const tr = document.createElement("tr");
        const tdIndex = document.createElement("td");
        tdIndex.textContent = index + 1;
        const tdName = document.createElement("td");
        tdName.textContent = name === "" ? "—" : name;
        const tdQty = document.createElement("td");
        tdQty.textContent = qty.toString();
        const tdUnit = document.createElement("td");
        tdUnit.textContent = unit === "" ? "—" : unit;
        const tdPrice = document.createElement("td");
        tdPrice.textContent = formatCurrency(price);
        const tdSum = document.createElement("td");
        tdSum.textContent = formatCurrency(sum);

        tr.appendChild(tdIndex);
        tr.appendChild(tdName);
        tr.appendChild(tdQty);
        tr.appendChild(tdUnit);
        tr.appendChild(tdPrice);
        tr.appendChild(tdSum);
        previewItemsBody.appendChild(tr);
    });

    if (totalSumEl) totalSumEl.textContent = formatCurrency(total);
    if (previewTotalSum) previewTotalSum.textContent = formatCurrency(total);
}

function downloadPdf() {
    if (typeof window.html2pdf !== "function") {
        alert(getTranslation("pdfLoadError"));
        return;
    }

    const companyName = companyNameInput ? companyNameInput.value.trim() : "";
    const clientName = clientNameInput ? clientNameInput.value.trim() : "";
    const rows = itemsBody ? itemsBody.querySelectorAll(".item-row") : [];
    let hasPosition = false;
    const items = [];

    rows.forEach((row) => {
        const nameInput = row.querySelector(".item-input--name");
        const qtyInput = row.querySelector(".item-input--qty");
        const unitInput = row.querySelector(".item-input--unit");
        const priceInput = row.querySelector(".item-input--price");
        const name = nameInput ? nameInput.value.trim() : "";
        const qty = parseNumber(qtyInput && qtyInput.value);
        const unit = unitInput ? unitInput.value.trim() : "";
        const price = parseNumber(priceInput && priceInput.value);
        const sum = qty * price;
        if (name !== "") hasPosition = true;
        items.push({ name, qty, unit, price, sum });
    });

    if (!companyName) {
        alert(getTranslation("fillCompany"));
        if (companyNameInput) companyNameInput.focus();
        return;
    }
    if (!clientName) {
        alert(getTranslation("fillClient"));
        if (clientNameInput) clientNameInput.focus();
        return;
    }
    if (!hasPosition) {
        alert(getTranslation("addPosition"));
        if (addRowBtn) addRowBtn.focus();
        return;
    }

    const pdfHtml = buildPdfHtml({
        companyName: companyNameInput ? companyNameInput.value : "",
        companyPhone: companyPhoneInput ? companyPhoneInput.value : "",
        companyEmail: companyEmailInput ? companyEmailInput.value : "",
        companyInfo: companyInfoInput ? companyInfoInput.value : "",
        clientName: clientNameInput ? clientNameInput.value : "",
        clientPhone: clientPhoneInput ? clientPhoneInput.value : "",
        clientEmail: clientEmailInput ? clientEmailInput.value : "",
        validUntil: validUntilInput ? validUntilInput.value : "",
        paymentTerms: paymentTermsInput ? paymentTermsInput.value : "",
        notes: notesInput ? notesInput.value : "",
        items
    });

    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.left = "-20000px";
    wrapper.style.top = "0";
    wrapper.style.width = "210mm";
    wrapper.style.height = "297mm";
    wrapper.style.background = "#ffffff";
    wrapper.style.padding = "0";
    wrapper.style.overflow = "hidden";
    wrapper.style.zIndex = "-9999";
    wrapper.style.opacity = "0";
    wrapper.style.pointerEvents = "none";

    wrapper.innerHTML = pdfHtml;
    document.body.appendChild(wrapper);

    const opt = {
        margin: 0,
        filename: "kommercheskoe-predlozhenie.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2.5, useCORS: true, logging: false, scrollX: 0, scrollY: 0, width: 794 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] }
    };

    const prevScrollY = window.scrollY || 0;
    window.scrollTo(0, 0);

    try {
        window.html2pdf()
            .set(opt)
            .from(wrapper.firstElementChild)
            .save()
            .then(() => {
                if (wrapper.parentNode) document.body.removeChild(wrapper);
                window.scrollTo(0, prevScrollY);
            })
            .catch((err) => {
                console.error(err);
                if (wrapper.parentNode) document.body.removeChild(wrapper);
                window.scrollTo(0, prevScrollY);
                alert(getTranslation("pdfError"));
            });
    } catch (err) {
        console.error(err);
        if (wrapper.parentNode) document.body.removeChild(wrapper);
        window.scrollTo(0, prevScrollY);
        alert(getTranslation("pdfError"));
    }
}

function buildPdfHtml(data) {
    const { companyName, companyPhone, companyEmail, companyInfo, clientName, clientPhone, clientEmail, validUntil, paymentTerms, notes, items } = data;

    const formatCurrency = (value) => {
        const num = typeof value === "number" && !isNaN(value) ? value : 0;
        return new Intl.NumberFormat(getTranslation("dateFormat")).format(Math.max(num, 0)) + " " + getTranslation("currency");
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return getTranslation("invalidDate");
        try {
            const d = new Date(dateStr + "T00:00:00");
            if (isNaN(d.getTime())) return dateStr;
            return d.toLocaleDateString(getTranslation("dateFormat"));
        } catch (e) {
            return dateStr;
        }
    };

    let itemsHtml = "";
    items.forEach((item, index) => {
        const bg = index % 2 === 0 ? "#ffffff" : "#fafbfe";
        itemsHtml += `
            <tr style="background:${bg};">
                <td style="padding:10px 14px;border:1px solid #eceef7;text-align:center;">${index + 1}</td>
                <td style="padding:10px 14px;border:1px solid #eceef7;">${(item.name || "—").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
                <td style="padding:10px 14px;border:1px solid #eceef7;text-align:right;">${item.qty}</td>
                <td style="padding:10px 14px;border:1px solid #eceef7;text-align:center;">${(item.unit || "—").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
                <td style="padding:10px 14px;border:1px solid #eceef7;text-align:right;">${formatCurrency(item.price)}</td>
                <td style="padding:10px 14px;border:1px solid #eceef7;text-align:right;">${formatCurrency(item.qty * item.price)}</td>
            </tr>
        `;
    });

    const total = items.reduce((acc, it) => acc + it.qty * it.price, 0);

    return `
    <div style="width:210mm;min-height:297mm;background:#ffffff;color:#1f2430;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.5;padding:18mm 16mm 20mm;box-sizing:border-box;">
        <header style="display:flex;justify-content:space-between;gap:24px;margin-bottom:24px;flex-wrap:wrap;">
            <div>
                <div style="font-size:18px;font-weight:600;">${(companyName || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
                <div style="margin-top:6px;color:#4f5568;font-size:12px;display:flex;flex-direction:column;gap:2px;">
                    ${companyPhone ? `<div>${(companyPhone).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>` : ""}
                    ${companyEmail ? `<div>${(companyEmail).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>` : ""}
                    ${companyInfo ? `<div>${(companyInfo).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>` : ""}
                </div>
            </div>
            <div style="text-align:right;display:flex;flex-direction:column;gap:4px;color:#4f5568;font-size:12px;">
                <div>${getTranslation("pdfTitle")}</div>
                <div style="display:flex;gap:10px;justify-content:flex-end;"><span>${getTranslation("dateLabel")}</span><span>${new Date().toLocaleDateString(getTranslation("dateFormat"))}</span></div>
                <div style="display:flex;gap:10px;justify-content:flex-end;"><span>${getTranslation("validUntilLabel")}</span><span>${formatDate(validUntil)}</span></div>
            </div>
        </header>
        <section style="margin-bottom:22px;">
            <div style="font-weight:600;text-transform:uppercase;letter-spacing:0.12em;font-size:12px;color:#6b728e;margin-bottom:16px;">${getTranslation("forWhomLabel")}</div>
            <div style="display:flex;flex-direction:column;gap:2px;">
                <div>${(clientName || "—").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
                ${clientPhone ? `<div>${(clientPhone).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>` : ""}
                ${clientEmail ? `<div>${(clientEmail).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>` : ""}
            </div>
        </section>
        <section style="margin-bottom:22px;">
            <div style="font-weight:600;text-transform:uppercase;letter-spacing:0.12em;font-size:12px;color:#6b728e;margin-bottom:16px;">${getTranslation("itemsLabelHeader")}</div>
            <div style="overflow-x:auto;">
                <table style="width:100%;border-collapse:collapse;min-width:640px;font-size:11px;">
                    <thead>
                        <tr>
                            <th style="text-align:center;background:#f5f6fa;color:#4f5568;font-weight:500;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;padding:6px 8px;border:1px solid #d7dbe8;">#</th>
                            <th style="text-align:left;background:#f5f6fa;color:#4f5568;font-weight:500;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;padding:6px 8px;border:1px solid #d7dbe8;">${getTranslation("colNamePreview")}</th>
                            <th style="text-align:right;background:#f5f6fa;color:#4f5568;font-weight:500;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;padding:6px 8px;border:1px solid #d7dbe8;">${getTranslation("colQty")}</th>
                            <th style="text-align:center;background:#f5f6fa;color:#4f5568;font-weight:500;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;padding:6px 8px;border:1px solid #d7dbe8;">${getTranslation("colUnit")}</th>
                            <th style="text-align:right;background:#f5f6fa;color:#4f5568;font-weight:500;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;padding:6px 8px;border:1px solid #d7dbe8;">${getTranslation("priceLabel")}, ${getTranslation("currency")}</th>
                            <th style="text-align:right;background:#f5f6fa;color:#4f5568;font-weight:500;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;padding:6px 8px;border:1px solid #d7dbe8;">${getTranslation("sumLabel")}, ${getTranslation("currency")}</th>
                        </tr>
                    </thead>
                    <tbody>${itemsHtml}</tbody>
                </table>
            </div>
            <div style="display:flex;justify-content:flex-end;gap:16px;margin-top:10px;font-size:14px;">
                <span>${getTranslation("totalLabel")}</span>
                <strong>${new Intl.NumberFormat(getTranslation("dateFormat")).format(total)} ${getTranslation("currency")}</strong>
            </div>
        </section>
        ${(paymentTerms || notes) ? `
        <section style="margin-bottom:22px;">
            <div style="font-weight:600;text-transform:uppercase;letter-spacing:0.12em;font-size:12px;color:#6b728e;margin-bottom:16px;">${getTranslation("conditionsLabelHeader") || getTranslation("conditionsLabel")}</div>
            <div style="display:flex;flex-direction:column;gap:6px;color:#4f5568;font-size:12px;">
                ${paymentTerms ? `<div><strong>${getTranslation("paymentTerms")}:</strong> ${(paymentTerms).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>` : ""}
                ${notes ? `<div><strong>${getTranslation("notes")}:</strong> ${(notes).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>` : ""}
            </div>
        </section>
        ` : ""}
        <footer style="margin-top:30px;display:flex;flex-direction:column;gap:4px;font-size:12px;">
            <div>${getTranslation("regardsLabel")}</div>
            <div style="font-weight:600;">${(companyName || getTranslation("companyNamePreview")).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
        </footer>
    </div>
    `;
}

function toISODate(d) {
    if (!d) return "";
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}

function fromISODate(s) {
    if (!s) return null;
    const parts = s.split("-");
    if (parts.length !== 3) return null;
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    if (isNaN(d.getTime())) return null;
    return d;
}

function renderCalendar() {
    if (!calendarDays || !calendarTitle) return;
    calendarTitle.textContent = `${getTranslation("months")[calendarDate.getMonth()]} ${calendarDate.getFullYear()}`;
    const weekdaySpans = document.querySelectorAll('.calendar-weekdays span');
    const weekdays = getTranslation('weekdays') || ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    weekdaySpans.forEach((el, idx) => {
        if (weekdays[idx]) el.textContent = weekdays[idx];
    });
    calendarDays.innerHTML = "";

    const firstDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1);
    const lastDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0);
    const startDay = (firstDay.getDay() + 6) % 7;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < startDay; i++) {
        const empty = document.createElement("button");
        empty.type = "button";
        empty.className = "calendar-day other-month disabled";
        empty.disabled = true;
        calendarDays.appendChild(empty);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "calendar-day";
        btn.textContent = day;
        const dateObj = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
        if (dateObj.getTime() === today.getTime()) btn.classList.add("today");
        if (selectedDate && dateObj.getTime() === selectedDate.getTime()) btn.classList.add("selected");
        btn.addEventListener("click", () => {
            selectedDate = dateObj;
            if (validUntilInput) {
                validUntilInput.value = toISODate(dateObj);
                validUntilInput.dispatchEvent(new Event("change", { bubbles: true }));
            }
            updateDateFieldDisplay();
            if (calendarPopup) calendarPopup.classList.remove("open");
            updatePreview();
        });
        calendarDays.appendChild(btn);
    }

    const totalCells = startDay + lastDay.getDate();
    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 0; i < remaining; i++) {
        const empty = document.createElement("button");
        empty.type = "button";
        empty.className = "calendar-day other-month disabled";
        empty.disabled = true;
        calendarDays.appendChild(empty);
    }
}

function openCalendar() {
    if (!calendarPopup) return;
    const current = fromISODate(validUntilInput ? validUntilInput.value : "");
    if (current) {
        selectedDate = current;
        calendarDate = new Date(current.getFullYear(), current.getMonth(), 1);
    } else {
        const now = new Date();
        selectedDate = null;
        calendarDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }
    renderCalendar();
    calendarPopup.classList.add("open");
}

function closeCalendar() {
    if (calendarPopup) calendarPopup.classList.remove("open");
}

if (dateFieldWrapper) {
    dateFieldWrapper.addEventListener("click", (e) => {
        e.stopPropagation();
        if (calendarPopup && calendarPopup.classList.contains("open")) {
            closeCalendar();
        } else {
            openCalendar();
        }
    });
}

if (prevMonthBtn) {
    prevMonthBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        calendarDate.setMonth(calendarDate.getMonth() - 1);
        renderCalendar();
    });
}

if (nextMonthBtn) {
    nextMonthBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        calendarDate.setMonth(calendarDate.getMonth() + 1);
        renderCalendar();
    });
}

document.addEventListener("click", (e) => {
    if (!calendarPopup || !calendarPopup.classList.contains("open")) return;
    if (calendarPopup.contains(e.target) || (dateFieldWrapper && dateFieldWrapper.contains(e.target))) return;
    closeCalendar();
});

if (validUntilInput) {
    validUntilInput.addEventListener("change", () => {
        const d = fromISODate(validUntilInput.value);
        if (d) selectedDate = d;
        updateDateFieldDisplay();
        updatePreview();
    });
}

if (addRowBtn) {
    addRowBtn.addEventListener("click", () => {
        createRow();
        updatePreview();
    });
}

if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener("click", downloadPdf);
}

if (resetBtn) {
    resetBtn.addEventListener("click", () => {
        if (companyNameInput) companyNameInput.value = "";
        if (companyPhoneInput) companyPhoneInput.value = "";
        if (companyEmailInput) companyEmailInput.value = "";
        if (companyInfoInput) companyInfoInput.value = "";
        if (clientNameInput) clientNameInput.value = "";
        if (clientPhoneInput) clientPhoneInput.value = "";
        if (clientEmailInput) clientEmailInput.value = "";
        if (validUntilInput) validUntilInput.value = "";
        if (validUntilDisplay) validUntilDisplay.value = "";
        selectedDate = null;
        if (paymentTermsInput) paymentTermsInput.value = "";
        if (notesInput) notesInput.value = "";
        try { localStorage.removeItem(COMPANY_STORAGE_KEY); } catch (e) {}
        if (itemsBody) itemsBody.innerHTML = "";
        createRow();
        updateDate();
        updatePreview();
    });
}

if (companyNameInput) {
    companyNameInput.addEventListener("input", () => {
        saveCompanyData();
        updatePreview();
    });
}
if (companyPhoneInput) {
    companyPhoneInput.addEventListener("input", () => {
        saveCompanyData();
        updatePreview();
    });
}
if (companyEmailInput) {
    companyEmailInput.addEventListener("input", () => {
        saveCompanyData();
        updatePreview();
    });
}
if (companyInfoInput) {
    companyInfoInput.addEventListener("input", () => {
        saveCompanyData();
        updatePreview();
    });
}
if (clientNameInput) clientNameInput.addEventListener("input", updatePreview);
if (clientPhoneInput) clientPhoneInput.addEventListener("input", updatePreview);
if (clientEmailInput) clientEmailInput.addEventListener("input", updatePreview);
if (paymentTermsInput) paymentTermsInput.addEventListener("input", updatePreview);
if (notesInput) notesInput.addEventListener("input", updatePreview);

loadCompanyData();
updateDate();
createRow();
updatePreview();
updateAllTexts();
updateLangToggle();
