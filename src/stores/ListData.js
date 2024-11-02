import { defineStore } from "pinia";
import { ref } from "vue";

export const useListData = defineStore("ListData", () => {
    const editingTicketData = ref({
        premise_id: "",
        
        number: "",
        address: "",
        numberHome: "",
        created: "",
        id: "",
      
        apartment_id: "",
        applicant: {
          first_name: "",
          last_name: "",
          patronymic_name: "",
          username: "",
        },
        description: "",
        due_date: "",
        status_id: "1",
      });
    return { editingTicketData };

});