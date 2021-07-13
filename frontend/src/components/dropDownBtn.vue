<template>
  <div class="container">
    <q-btn-dropdown
      color="accent"
      label="Dropdown Button"
      dropdown-icon="change_history"
      size="md"
      style="margin-left:5vw;margin-top:6.25vh"
    >
      <!-- <div class="container">
        <link rel="stylesheet" href="./css/toggleBtn.css"/>
        <q-item clickable>
            <q-btn 
            color="accent"
            :class="{selected : isSelected}"></q-btn>
        </q-item>
    </div> -->

      <!-- <q-list>
      <q-item clickable>
        <q-btn color="accent" label="Near Me" />
      </q-item>

      <q-item clickable> 
        <q-item-section>Preferences</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>
        <q-btn-toggle
          v-model="model"
          toggle-color="primary"
          :options="[
            { label: 'One', value: 'one' },
            { label: 'Two', value: 'two' },
            { label: 'Three', value: 'three' },
          ]"
        />
      </q-item>

      <q-item clickable>
        <q-item-section>
          <q-item-label>Articles</q-item-label>
        </q-item-section>
      </q-item>
    </q-list> -->
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
