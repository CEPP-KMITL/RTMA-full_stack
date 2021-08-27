<template>
  <div class="container">
    <q-btn-dropdown
      color="accent"
      label="Dropdown Button"
      dropdown-icon="change_history"
      size="md"
      style="margin-left:5vw;margin-top:6.25vh"
    >
    </q-btn-dropdown>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
    data(){
        return { 
            isSelected : false,
        }
    }
});
</script>

<style>
.container button{
    padding: 10px 20px;
    background-color: #f00;
    cursor: pointer;
    display: initial
}
.container button.selected {
    background-color: #080;
    display: none
    
}</style>
