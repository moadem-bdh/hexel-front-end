import { useState } from "react";

function useForm(defaultValue) {
  const [form, setForm] = useState(defaultValue ?? {});

  function onChangeSetForm(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  function reset() {
    setForm({});
  }

  function hardSet(data) {
    setForm((prev) => ({
      ...prev,
      ...data
    }));
  }

  return {
    form,
    onChangeSetForm,
    reset,
    hardSet
  };
}

export default useForm;