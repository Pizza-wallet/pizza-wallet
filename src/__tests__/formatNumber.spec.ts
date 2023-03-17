import { limitDigits } from "../helpers/formatters";

describe("limitDigits", () => {
  it("displays up to 2 decimal points if the first or second digit after the comma is non-zero", () => {
    expect(limitDigits(1.02)).toBe("1.02");
    expect(limitDigits(13.28)).toBe("13.28");
    expect(limitDigits(1009.8)).toBe("1009.80");
    expect(limitDigits(0.04)).toBe("0.04");
  });

  it("displays up to 4 decimal points after the first non-zero digit", () => {
    expect(limitDigits(0.00006)).toBe(0.0001);
    expect(limitDigits(0.008)).toBe("0.0080");
    expect(limitDigits(0.00007)).toBe(0.0001);
    // expect(limitDigits(0.0000003)).toBe("0.0000003");
  });

  it("removes trailing zeros", () => {
    expect(limitDigits(1.2)).toBe("1.20");
    // expect(limitDigits(0.0005)).toBe("0.0005");
    expect(limitDigits(2.5)).toBe("2.50");
  });

  it("rounds after the third decimal point if there is excess", () => {
    expect(limitDigits(0.00061)).toBe(0.001);
    expect(limitDigits(0.00059)).toBe(0.001);
    expect(limitDigits(0.0006)).toBe(0.001);
    expect(limitDigits(0.0005)).toBe("0.005");
  });

  it("displays the number in the format 0,0..x if there are numbers after the fifth decimal point", () => {
    expect(limitDigits(0.000005)).toBe("0.0..5");
    expect(limitDigits(0.000007)).toBe("0.0..7");
    expect(limitDigits(0.00000001)).toBe("0.0..1");
  });
});
