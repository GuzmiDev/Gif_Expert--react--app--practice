import React from "react";
import { shallow } from "enzyme";
import { AddCategory } from "../../components/AddCategory";

describe("Pruebas en <AddCategory/>", () => {
  const setCategories = jest.fn();
  let wrapper = shallow(<AddCategory setCategories={setCategories} />);
  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(<AddCategory setCategories={setCategories} />);
  });

  test("Debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de cambiar la caja de texto", () => {
    const input = wrapper.find("input");
    const value = "Hola Mundo";
    input.simulate("change", { target: { value } });

    const inputAfter = wrapper.find("input");
    expect(inputAfter.prop("value")).toBe(value);
  });

  test("No debe de postear la información con submit", () => {
    wrapper.find("form").simulate("submit", { preventDefault() {} });

    expect(setCategories).not.toHaveBeenCalled();
  });

  test("debe llamar el setCategories y limpiar la caja de texto", () => {
    const value = "Hola Mundo";

    const input = wrapper.find("input");
    input.simulate("change", { target: { value } });

    const form = wrapper.find("form");
    form.simulate("submit", { preventDefault() {} });

    const inputAfter = wrapper.find("input");

    expect(inputAfter.prop("value")).toBe("");
    expect(setCategories).toHaveBeenCalledWith(expect.any(Function));
  });
});
