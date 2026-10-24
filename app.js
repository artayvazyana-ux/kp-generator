const itemsBody = document.getElementById("itemsBody");
const addRowBtn = document.getElementById("addRowBtn");
const itemRowTemplate = document.getElementById("itemRowTemplate");
const totalSumEl = document.getElementById("totalSum");
const downloadPdfBtn = document.getElementById("downloadPdfBtn");

const resetBtn = document.getElementById("resetBtn");

const companyNameInput = document.getElementById("companyName");
const companyPhoneInput = document.getElementById("companyPhone");
const companyEmailInput = document.getElementById("companyEmail");
const companyInfoInput = document.getElementById("companyInfo");

const clientNameInput = document.getElementById("clientName");
const clientPhoneInput = document.getElementById("clientPhone");
const clientEmailInput = document.getElementById("clientEmail");

const validUntilInput = document.getElementById("validUntil");
const validUntilTrigger = document.getElementById("validUntilTrigger");
const calendarPopup = document.getElementById("calendarPopup");
const calendarTitle = document.getElementById("calendarTitle");
const calendarDays = document.getElementById("calendarDays");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const paymentTermsInput = document.getElementById("paymentTerms");
const notesInput = document.getElementById("notes");

let calendarDate = new Date();
let selectedDate = null;

// localStorage для черновика компании
const COMPANY_STORAGE_KEY = "kp-company-draft";

function saveCompanyData() {
    const data = {
        companyName: companyNameInput ? companyNameInput.value : "",
        companyPhone: companyPhoneInput ? companyPhoneInput.value : "",
        companyEmail: companyEmailInput ? companyEmailInput.value : "",
        companyInfo: companyInfoInput ? companyInfoInput.value : "",
    };
    try {
        localStorage.setItem(COMPANY_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn("Не удалось сохранить черновик компании:", e);
    }
}

function loadCompanyData() {
    try {
        const saved = localStorage.getItem(COMPANY_STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            if (companyNameInput && data.companyName) companyNameInput.value = data.companyName;
            if (companyPhoneInput && data.companyPhone) companyPhoneInput.value = data.companyPhone;
            if (companyEmailInput && data.companyEmail) companyEmailInput.value = data.companyEmail;
            if (companyInfoInput && data.companyInfo) companyInfoInput.value = data.companyInfo;
        }
    } catch (e) {
        console.warn("Не удалось загрузить черновик компании:", e);
    }
}

function clearCompanyData() {
    try {
        localStorage.removeItem(COMPANY_STORAGE_KEY);
    } catch (e) {
        console.warn("Не удалось удалить черновик компании:", e);
    }
}

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

const formatter = new Intl.NumberFormat("ru-RU");

function formatCurrency(value) {
    const num = typeof value === "number" && !isNaN(value) ? value : 0;
    return `${formatter.format(Math.max(num, 0))} ₽`;
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
    const dateStr = now.toLocaleDateString("ru-RU");
    if (previewDate) {
        previewDate.textContent = dateStr;
    }
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

    const parseNumber = (val) => {
        if (!val) return 0;
        const normalized = val.toString().replace(",", ".");
        const num = parseFloat(normalized);
        return isNaN(num) ? 0 : num;
    };

    const update = () => {
        const qty = parseNumber(qtyInput && qtyInput.value);
        const price = parseNumber(priceInput && priceInput.value);
        const sum = qty * price;
        if (sumEl) {
            sumEl.textContent = formatCurrency(sum);
        }
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

    if (previewCompanyName) {
        if (companyName.trim() === "") {
            previewCompanyName.textContent = "Название вашей компании";
        } else {
            previewCompanyName.textContent = companyName;
        }
    }
    if (previewFooterCompany) {
        if (companyName.trim() === "") {
            previewFooterCompany.textContent = "Название вашей компании";
        } else {
            previewFooterCompany.textContent = companyName;
        }
    }

    setText(previewCompanyPhone, companyPhone);
    setText(previewCompanyEmail, companyEmail);
    setText(previewCompanyInfo, companyInfo);

    const clientName = clientNameInput ? clientNameInput.value : "";
    const clientPhone = clientPhoneInput ? clientPhoneInput.value : "";
    const clientEmail = clientEmailInput ? clientEmailInput.value : "";

    if (previewClientName) {
        if (clientName.trim() === "") {
            previewClientName.textContent = "Укажите получателя КП";
        } else {
            previewClientName.textContent = clientName;
        }
    }
    setText(previewClientPhone, clientPhone);
    setText(previewClientEmail, clientEmail);

    const validUntil = validUntilInput ? validUntilInput.value : "";
    if (previewValidUntil) {
        if (validUntil.trim() === "") {
            previewValidUntil.textContent = "—";
        } else {
            try {
                const dateObj = new Date(validUntil + "T00:00:00");
                if (isNaN(dateObj.getTime())) {
                    previewValidUntil.textContent = validUntil;
                } else {
                    previewValidUntil.textContent = dateObj.toLocaleDateString("ru-RU");
                }
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
    const rows = itemsBody.querySelectorAll ? itemsBody.querySelectorAll(".item-row") : [];

    rows.forEach((row, index) => {
        const nameInputEl = row.querySelector(".item-input--name");
        const qtyInputEl = row.querySelector(".item-input--qty");
        const unitInputEl = row.querySelector(".item-input--unit");
        const priceInputEl = row.querySelector(".item-input--price");

        const name = nameInputEl ? nameInputEl.value.trim() : "";
        const parseNumber = (val) => {
            if (!val) return 0;
            const normalized = val.toString().replace(",", ".");
            const num = parseFloat(normalized);
            return isNaN(num) ? 0 : num;
        };
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

    if (totalSumEl) {
        totalSumEl.textContent = formatCurrency(total);
    }
    if (previewTotalSum) {
        previewTotalSum.textContent = formatCurrency(total);
    }
}

function downloadPdf() {
    const element = document.getElementById("kpPreview");
    if (!element) {
        alert("Не найден предпросмотр КП");
        return;
    }
    if (typeof window.html2pdf !== "function") {
        alert("Библиотека html2pdf не загрузилась. Попробуйте открыть файл через локальный сервер (http://127.0.0.1:8080)");
        return;
    }

    const companyName = companyNameInput ? companyNameInput.value.trim() : "";
    const clientName = clientNameInput ? clientNameInput.value.trim() : "";
    const rows = itemsBody ? itemsBody.querySelectorAll(".item-row") : [];
    let hasPosition = false;
    rows.forEach((row) => {
        const nameInput = row.querySelector(".item-input--name");
        if (nameInput && nameInput.value.trim() !== "") {
            hasPosition = true;
        }
    });

    if (!companyName) {
        alert("Заполните название компании");
        companyNameInput.focus();
        return;
    }
    if (!clientName) {
        alert("Укажите клиента (для кого КП)");
        clientNameInput.focus();
        return;
    }
    if (!hasPosition) {
        alert("Добавьте хотя бы одну позицию");
        addRowBtn.focus();
        return;
    }

    const prevScrollY = window.scrollY || 0;
    window.scrollTo(0, 0);

    const opt = {
        margin: [10, 10, 10, 10],
        filename: "kommercheskoe-predlozhenie.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, scrollX: 0, scrollY: 0 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] }
    };

    try {
        window.html2pdf().set(opt).from(element).save().then(() => {
            window.scrollTo(0, prevScrollY);
        }).catch((err) => {
            console.error(err);
            window.scrollTo(0, prevScrollY);
            alert("Не удалось сформировать PDF. Попробуйте ещё раз.");
        });
    } catch (err) {
        console.error(err);
        window.scrollTo(0, prevScrollY);
        alert("Не удалось сформировать PDF. Попробуйте ещё раз.");
    }
}

function collectKpData() {
    const companyName = companyNameInput ? companyNameInput.value : "";
    const companyPhone = companyPhoneInput ? companyPhoneInput.value : "";
    const companyEmail = companyEmailInput ? companyEmailInput.value : "";
    const companyInfo = companyInfoInput ? companyInfoInput.value : "";

    const clientName = clientNameInput ? clientNameInput.value : "";
    const clientPhone = clientPhoneInput ? clientPhoneInput.value : "";
    const clientEmail = clientEmailInput ? clientEmailInput.value : "";

    const validUntil = validUntilInput ? validUntilInput.value : "";
    const paymentTerms = paymentTermsInput ? paymentTermsInput.value : "";
    const notes = notesInput ? notesInput.value : "";

    const rows = itemsBody ? itemsBody.querySelectorAll(".item-row") : [];
    const items = [];
    rows.forEach((row) => {
        const nameInputEl = row.querySelector(".item-input--name");
        const qtyInputEl = row.querySelector(".item-input--qty");
        const unitInputEl = row.querySelector(".item-input--unit");
        const priceInputEl = row.querySelector(".item-input--price");
        const name = nameInputEl ? nameInputEl.value.trim() : "";
        const parseNumber = (val) => {
            if (!val) return 0;
            const normalized = val.toString().replace(",", ".");
            const num = parseFloat(normalized);
            return isNaN(num) ? 0 : num;
        };
        const qty = parseNumber(qtyInputEl && qtyInputEl.value);
        const unit = unitInputEl ? unitInputEl.value.trim() : "";
        const price = parseNumber(priceInputEl && priceInputEl.value);
        const sum = qty * price;
        items.push({ name, qty, unit, price, sum });
    });

    const total = items.reduce((acc, it) => acc + it.sum, 0);
    return { companyName, companyPhone, companyEmail, companyInfo, clientName, clientPhone, clientEmail, validUntil, paymentTerms, notes, items, total };
}

function downloadDocx() {
    if (typeof window.docx === "undefined") {
        if (typeof docx !== "undefined") window.docx = docx;
        else if (typeof window.docxlib !== "undefined") window.docx = window.docxlib;
    }
    if (typeof window.docx === "undefined") {
        alert("Библиотека docx не загрузилась. Попробуйте обновить страницу.");
        return;
    }
    const docxLib = window.docx;
    const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType } = docxLib;
    const data = collectKpData();

    const companyLines = [];
    if (data.companyName) companyLines.push(data.companyName);
    if (data.companyPhone) companyLines.push("Тел.: " + data.companyPhone);
    if (data.companyEmail) companyLines.push("E-mail: " + data.companyEmail);
    if (data.companyInfo) companyLines.push(data.companyInfo);

    const clientLines = [];
    if (data.clientName) clientLines.push(data.clientName);
    if (data.clientPhone) clientLines.push("Тел.: " + data.clientPhone);
    if (data.clientEmail) clientLines.push("E-mail: " + data.clientEmail);

    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        text: "Коммерческое предложение",
                        heading: HeadingLevel.HEADING_1,
                        alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Дата: ", bold: true }),
                            new TextRun(new Date().toLocaleDateString("ru-RU")),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Действует до: ", bold: true }),
                            new TextRun(data.validUntil ? new Date(data.validUntil + "T00:00:00").toLocaleDateString("ru-RU") : "—"),
                        ],
                    }),
                    new Paragraph({ text: "" }),
                    new Paragraph({
                        children: [new TextRun({ text: "Компания", bold: true })],
                    }),
                    ...companyLines.map((line) => new Paragraph({ text: line })),
                    new Paragraph({ text: "" }),
                    new Paragraph({
                        children: [new TextRun({ text: "Для кого", bold: true })],
                    }),
                    ...clientLines.map((line) => new Paragraph({ text: line })),
                    new Paragraph({ text: "" }),
                    new Paragraph({
                        children: [new TextRun({ text: "Перечень работ и услуг", bold: true })],
                    }),
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph({ text: "#", alignment: AlignmentType.CENTER })] }),
                                    new TableCell({ children: [new Paragraph({ text: "Наименование" })] }),
                                    new TableCell({ children: [new Paragraph({ text: "Кол-во", alignment: AlignmentType.RIGHT })] }),
                                    new TableCell({ children: [new Paragraph({ text: "Ед.", alignment: AlignmentType.CENTER })] }),
                                    new TableCell({ children: [new Paragraph({ text: "Цена, ₽", alignment: AlignmentType.RIGHT })] }),
                                    new TableCell({ children: [new Paragraph({ text: "Сумма, ₽", alignment: AlignmentType.RIGHT })] }),
                                ],
                            }),
                            ...data.items.map((it, idx) =>
                                new TableRow({
                                    children: [
                                        new TableCell({ children: [new Paragraph({ text: String(idx + 1), alignment: AlignmentType.CENTER })] }),
                                        new TableCell({ children: [new Paragraph({ text: it.name || "—" })] }),
                                        new TableCell({ children: [new Paragraph({ text: String(it.qty), alignment: AlignmentType.RIGHT })] }),
                                        new TableCell({ children: [new Paragraph({ text: it.unit || "—", alignment: AlignmentType.CENTER })] }),
                                        new TableCell({ children: [new Paragraph({ text: new Intl.NumberFormat("ru-RU").format(it.price), alignment: AlignmentType.RIGHT })] }),
                                        new TableCell({ children: [new Paragraph({ text: new Intl.NumberFormat("ru-RU").format(it.sum), alignment: AlignmentType.RIGHT })] }),
                                    ],
                                })
                            ),
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph({ text: "" })] }),
                                    new TableCell({ children: [new Paragraph({ text: "Итого", bold: true })] }),
                                    new TableCell({ children: [new Paragraph({ text: "" })] }),
                                    new TableCell({ children: [new Paragraph({ text: "" })] }),
                                    new TableCell({ children: [new Paragraph({ text: "" })] }),
                                    new TableCell({ children: [new Paragraph({ text: new Intl.NumberFormat("ru-RU").format(data.total) + " ₽", bold: true, alignment: AlignmentType.RIGHT })] }),
                                ],
                            }),
                        ],
                    }),
                    new Paragraph({ text: "" }),
                    data.paymentTerms
                        ? new Paragraph({
                              children: [new TextRun({ text: "Условия оплаты: ", bold: true }), new TextRun(data.paymentTerms)],
                          })
                        : new Paragraph({}),
                    data.notes
                        ? new Paragraph({
                              children: [new TextRun({ text: "Примечания: ", bold: true }), new TextRun(data.notes)],
                          })
                        : new Paragraph({}),
                    new Paragraph({ text: "" }),
                    new Paragraph({ text: "С уважением," }),
                    new Paragraph({ text: data.companyName || "Название вашей компании" }),
                ],
            },
        ],
    });

    Packer.toBlob(doc).then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "kommercheskoe-predlozhenie.docx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }).catch((err) => {
        console.error(err);
        alert("Не удалось сформировать DOCX. Попробуйте ещё раз.");
    });
}

function downloadPng() {
    const element = document.getElementById("kpPreview");
    if (!element) {
        alert("Не найден предпросмотр КП");
        return;
    }
    const prevScrollY = window.scrollY || 0;
    window.scrollTo(0, 0);

    const finish = (dataUrl) => {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "kommercheskoe-predlozhenie.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.scrollTo(0, prevScrollY);
    };

    if (typeof window.html2canvas === "function") {
        window.html2canvas(element, { scale: 2, useCORS: true, backgroundColor: "#ffffff" })
            .then((canvas) => {
                finish(canvas.toDataURL("image/png"));
            })
            .catch((err) => {
                console.error(err);
                window.scrollTo(0, prevScrollY);
                alert("Не удалось сформировать PNG. Попробуйте ещё раз.");
            });
        return;
    }

    if (typeof window.htmlToImage === "undefined" && typeof htmlToImage !== "undefined") {
        window.htmlToImage = htmlToImage;
    }
    if (typeof window.htmlToImage === "undefined") {
        alert("Библиотека для PNG не загрузилась. Попробуйте обновить страницу.");
        window.scrollTo(0, prevScrollY);
        return;
    }
    const lib = window.htmlToImage;
    const fn = lib.toPng || (lib.default && lib.default.toPng);
    if (typeof fn !== "function") {
        alert("Функция toPng не найдена. Попробуйте обновить страницу.");
        window.scrollTo(0, prevScrollY);
        return;
    }
    fn(element, { pixelRatio: 2, cacheBust: true, backgroundColor: "#ffffff" })
        .then(finish)
        .catch((err) => {
            console.error(err);
            window.scrollTo(0, prevScrollY);
            alert("Не удалось сформировать PNG. Попробуйте ещё раз.");
        });
}

function resetForm() {
    if (companyNameInput) companyNameInput.value = "";
    if (companyPhoneInput) companyPhoneInput.value = "";
    if (companyEmailInput) companyEmailInput.value = "";
    if (companyInfoInput) companyInfoInput.value = "";

    if (clientNameInput) clientNameInput.value = "";
    if (clientPhoneInput) clientPhoneInput.value = "";
    if (clientEmailInput) clientEmailInput.value = "";

    if (validUntilInput) validUntilInput.value = "";
    if (paymentTermsInput) paymentTermsInput.value = "";
    if (notesInput) notesInput.value = "";

    if (itemsBody) {
        itemsBody.innerHTML = "";
    }
    clearCompanyData();
    createRow();
    updateDate();
    updatePreview();
}

if (addRowBtn) {
    addRowBtn.addEventListener("click", () => {
        createRow();
        updatePreview();
    });
}

const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const weekdayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

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
    calendarTitle.textContent = `${monthNames[calendarDate.getMonth()]} ${calendarDate.getFullYear()}`;
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
        empty.textContent = "";
        empty.disabled = true;
        calendarDays.appendChild(empty);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "calendar-day";
        btn.textContent = day;
        const dateObj = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
        if (dateObj.getTime() === today.getTime()) {
            btn.classList.add("today");
        }
        if (selectedDate && dateObj.getTime() === selectedDate.getTime()) {
            btn.classList.add("selected");
        }
        btn.addEventListener("click", () => {
            selectedDate = dateObj;
            if (validUntilInput) {
                validUntilInput.value = toISODate(dateObj);
            }
            calendarPopup.classList.remove("open");
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
        empty.textContent = "";
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
    if (calendarPopup) {
        calendarPopup.classList.remove("open");
    }
}

if (validUntilTrigger) {
    validUntilTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        if (calendarPopup.classList.contains("open")) {
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
    if (calendarPopup.contains(e.target) || (validUntilTrigger && validUntilTrigger.contains(e.target))) return;
    closeCalendar();
});

if (validUntilInput) {
    validUntilInput.addEventListener("change", () => {
        const d = fromISODate(validUntilInput.value);
        if (d) {
            selectedDate = d;
        }
        updatePreview();
    });
}

const inputsToWatch = [companyNameInput, companyPhoneInput, companyEmailInput, companyInfoInput, clientNameInput, clientPhoneInput, clientEmailInput, validUntilInput, paymentTermsInput, notesInput];
inputsToWatch.forEach((el) => {
    if (el) {
        el.addEventListener("input", updatePreview);
        el.addEventListener("change", updatePreview);
    }
});

const companyInputs = [companyNameInput, companyPhoneInput, companyEmailInput, companyInfoInput];
companyInputs.forEach((el) => {
    if (el) {
        el.addEventListener("input", saveCompanyData);
        el.addEventListener("change", saveCompanyData);
    }
});

if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener("click", downloadPdf);
}

if (resetBtn) {
    resetBtn.addEventListener("click", resetForm);
}

updateDate();
loadCompanyData();
createRow();
updatePreview();
