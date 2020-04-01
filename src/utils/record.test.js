import { parseRecord } from "./record";

describe("parseRecord", () => {
  describe("0 digits", () => {
    it("new record", () => {
      expect(parseRecord("")).toStrictEqual({
        sys: null,
        dia: null,
        pulse: null,
        cursor: "sys",
        isZeroAllowed: false,
        moreDigitsAllowed: true,
      });
    });
  });

  describe("1 digit", () => {
    it("1 digit sys", () => {
      expect(parseRecord("5")).toStrictEqual({
        sys: "5",
        dia: null,
        pulse: null,
        cursor: "sys",
        isZeroAllowed: true,
        moreDigitsAllowed: true,
      });
    });
  });

  describe("2 digits", () => {
    it("2 digits sys", () => {
      expect(parseRecord("12")).toStrictEqual({
        sys: "12",
        dia: null,
        pulse: null,
        cursor: "sys",
        isZeroAllowed: true,
        moreDigitsAllowed: true,
      });

      expect(parseRecord("49")).toStrictEqual({
        sys: "49",
        dia: null,
        pulse: null,
        cursor: "dia",
        isZeroAllowed: false,
        moreDigitsAllowed: true,
      });
    });
  });

  describe("3 digits", () => {
    it("3 digits sys", () => {
      expect(parseRecord("215")).toStrictEqual({
        sys: "215",
        dia: null,
        pulse: null,
        cursor: "dia",
        isZeroAllowed: false,
        moreDigitsAllowed: true,
      });
    });

    it("2 digits sys + 1 digit dia", () => {
      expect(parseRecord("951")).toStrictEqual({
        sys: "95",
        dia: "1",
        pulse: null,
        cursor: "dia",
        isZeroAllowed: true,
        moreDigitsAllowed: true,
      });
    });
  });

  describe("4 digits", () => {
    it("2 digits sys + 2 digits dia", () => {
      expect(parseRecord("9510")).toStrictEqual({
        sys: "95",
        dia: "10",
        pulse: null,
        cursor: "dia",
        isZeroAllowed: true,
        moreDigitsAllowed: true,
      });

      expect(parseRecord("9599")).toStrictEqual({
        sys: "95",
        dia: "99",
        pulse: null,
        cursor: "pulse",
        isZeroAllowed: false,
        moreDigitsAllowed: true,
      });
    });

    it("3 digits sys + 1 digit dia", () => {
      expect(parseRecord("1894")).toStrictEqual({
        sys: "189",
        dia: "4",
        pulse: null,
        cursor: "dia",
        isZeroAllowed: true,
        moreDigitsAllowed: true,
      });
    });
  });

  describe("5 digits", () => {
    it("2 digits sys + 2 digits dia + 1 digit pulse", () => {
      expect(parseRecord("99761")).toStrictEqual({
        sys: "99",
        dia: "76",
        pulse: "1",
        cursor: "pulse",
        isZeroAllowed: true,
        moreDigitsAllowed: true,
      });
    });

    it("2 digits sys + 3 digits dia", () => {
      expect(parseRecord("95101")).toStrictEqual({
        sys: "95",
        dia: "101",
        pulse: null,
        cursor: "pulse",
        isZeroAllowed: false,
        moreDigitsAllowed: true,
      });
    });

    it("3 digits sys + 2 digits dia", () => {
      expect(parseRecord("12015")).toStrictEqual({
        sys: "120",
        dia: "15",
        pulse: null,
        cursor: "dia",
        isZeroAllowed: true,
        moreDigitsAllowed: true,
      });

      expect(parseRecord("12080")).toStrictEqual({
        sys: "120",
        dia: "80",
        pulse: null,
        cursor: "pulse",
        isZeroAllowed: false,
        moreDigitsAllowed: true,
      });
    });
  });

  describe("6 digits", () => {
    it("2 digits sys + 2 digits dia + 2 digits pulse", () => {
      expect(parseRecord("975610")).toStrictEqual({
        sys: "97",
        dia: "56",
        pulse: "10",
        cursor: "pulse",
        isZeroAllowed: true,
        moreDigitsAllowed: true,
      });

      expect(parseRecord("975699")).toStrictEqual({
        sys: "97",
        dia: "56",
        pulse: "99",
        cursor: null,
        isZeroAllowed: false,
        moreDigitsAllowed: false,
      });
    });

    it("2 digits sys + 3 digits dia + 1 digit pulse", () => {
      expect(parseRecord("971011")).toStrictEqual({
        sys: "97",
        dia: "101",
        pulse: "1",
        cursor: "pulse",
        isZeroAllowed: true,
        moreDigitsAllowed: true,
      });
    });

    it("3 digits sys + 2 digits dia + 1 digit pulse", () => {
      expect(parseRecord("123989")).toStrictEqual({
        sys: "123",
        dia: "98",
        pulse: "9",
        cursor: "pulse",
        isZeroAllowed: true,
        moreDigitsAllowed: true,
      });
    });

    it("3 digits sys + 3 digits dia", () => {
      expect(parseRecord("153104")).toStrictEqual({
        sys: "153",
        dia: "104",
        pulse: null,
        cursor: "pulse",
        isZeroAllowed: false,
        moreDigitsAllowed: true,
      });
    });
  });

  describe("7 digits", () => {
    it("2 digits sys + 2 digits dia + 3 digits pulse", () => {
      expect(parseRecord("9756102")).toStrictEqual({
        sys: "97",
        dia: "56",
        pulse: "102",
        cursor: null,
        isZeroAllowed: false,
        moreDigitsAllowed: false,
      });
    });

    it("2 digits sys + 3 digits dia + 2 digits pulse", () => {
      expect(parseRecord("9710189")).toStrictEqual({
        sys: "97",
        dia: "101",
        pulse: "89",
        cursor: null,
        isZeroAllowed: false,
        moreDigitsAllowed: false,
      });

      expect(parseRecord("9710110")).toStrictEqual({
        sys: "97",
        dia: "101",
        pulse: "10",
        cursor: "pulse",
        isZeroAllowed: true,
        moreDigitsAllowed: true,
      });
    });

    it("3 digits sys + 2 digits dia + 2 digits pulse", () => {
      expect(parseRecord("1448972")).toStrictEqual({
        sys: "144",
        dia: "89",
        pulse: "72",
        cursor: null,
        isZeroAllowed: false,
        moreDigitsAllowed: false,
      });

      expect(parseRecord("1448911")).toStrictEqual({
        sys: "144",
        dia: "89",
        pulse: "11",
        cursor: "pulse",
        isZeroAllowed: true,
        moreDigitsAllowed: true,
      });
    });

    it("3 digits sys + 3 digits dia + 1 digit pulse", () => {
      expect(parseRecord("1441017")).toStrictEqual({
        sys: "144",
        dia: "101",
        pulse: "7",
        cursor: "pulse",
        isZeroAllowed: true,
        moreDigitsAllowed: true,
      });
    });
  });

  describe("8 digits", () => {
    it("2 digits sys + 3 digits dia + 3 digits pulse", () => {
      expect(parseRecord("97100132")).toStrictEqual({
        sys: "97",
        dia: "100",
        pulse: "132",
        cursor: null,
        isZeroAllowed: false,
        moreDigitsAllowed: false,
      });
    });

    it("3 digits sys + 2 digits dia + 3 digits pulse", () => {
      expect(parseRecord("13698132")).toStrictEqual({
        sys: "136",
        dia: "98",
        pulse: "132",
        cursor: null,
        isZeroAllowed: false,
        moreDigitsAllowed: false,
      });
    });

    it("3 digits sys + 3 digits dia + 2 digits pulse", () => {
      expect(parseRecord("13610213")).toStrictEqual({
        sys: "136",
        dia: "102",
        pulse: "13",
        cursor: "pulse",
        isZeroAllowed: true,
        moreDigitsAllowed: true,
      });

      expect(parseRecord("13610296")).toStrictEqual({
        sys: "136",
        dia: "102",
        pulse: "96",
        cursor: null,
        isZeroAllowed: false,
        moreDigitsAllowed: false,
      });
    });
  });

  describe("9 digits", () => {
    it("3 digits sys + 3 digits dia + 3 digits pulse", () => {
      expect(parseRecord("172123134")).toStrictEqual({
        sys: "172",
        dia: "123",
        pulse: "134",
        cursor: null,
        isZeroAllowed: false,
        moreDigitsAllowed: false,
      });
    });
  });
});
