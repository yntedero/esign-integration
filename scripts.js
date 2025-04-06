const { createApp, ref } = Vue;

createApp({
  setup() {
    // Define the data that we'll be using
    const fileData = ref(null);
    const fileName = ref("");
    const checkPDFA = ref(false);
    const currentStep = ref(1);
    const errorMessage = ref("");

    // Function to handle the file upload
    const nextStep = () => {
      if (currentStep.value < 5) {
        currentStep.value++;
      }
    };

    const prevStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
      }
    };

    const onFileChange = async (event) => {
      const file = event.target.files[0];
      if (!file) {
        fileData.value = null;
        fileName.value = "";
        errorMessage.value = "No file selected.";
        return;
      }
      fileName.value = file.name;
      const extension = file.name.split(".").pop().toLowerCase();
      if (extension !== "pdf" && extension !== "xml") {
        fileData.value = null;
        fileName.value = "";
        errorMessage.value =
          "Invalid file format. Please upload a PDF or XML file.";
        return;
      }
      try {
        const base64Content = await toBase64(file);
        fileData.value = base64Content;
        errorMessage.value = ""; // clear error on success
      } catch (error) {
        fileData.value = null;
        fileName.value = "";
        errorMessage.value = "Error processing file.";
      }
    };

    // Return the data and methods that we use
    return {
      fileData,
      fileName,
      checkPDFA,
      currentStep,
      errorMessage,
      nextStep,
      prevStep,
      onFileChange,
    };
  },
}).mount("#app");
