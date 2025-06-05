import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import InputField from "../components/ui/InputField";

describe("InputField", () => {
  it("renderiza correctamente con label", () => {
    const { getByText } = render(
      <InputField
        label="Nombre"
        value=""
        onChangeText={() => {}}
        error={null}
      />
    );
    expect(getByText("Nombre")).toBeTruthy();
  });

  it("muestra error si está presente", () => {
    const { getByText } = render(
      <InputField
        label="Correo"
        value=""
        onChangeText={() => {}}
        error="Campo obligatorio"
      />
    );
    expect(getByText("Campo obligatorio")).toBeTruthy();
  });

  it("llama a onChangeText cuando el usuario escribe", () => {
    const mockFn = jest.fn();
    const { getByDisplayValue } = render(
      <InputField
        label="Email"
        value="hola"
        onChangeText={mockFn}
        error={null}
      />
    );
    const input = getByDisplayValue("hola");
    fireEvent.changeText(input, "nuevo");
    expect(mockFn).toHaveBeenCalledWith("nuevo");
  });
});
