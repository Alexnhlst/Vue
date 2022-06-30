<template>
  <div id="app" class="ui text container">
    <div class="ui text container">
      <table class="ui selectable structured large table">
        <thead>
          <tr>
            <th>Items</th>
          </tr>
        </thead>
        <tbody class="item-list">
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ item }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>
              <form class="ui form" @submit="addItem">
                <div class="field">
                  <input type="text" class="prompt" v-model="item" placeholder="Add item...">
                </div>
                <button class="ui button" type="submit" :disabled="!item">Add</button>
                <span class="ui label" @click="removeAllItems">Remove all</span>
              </form>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      item: '',
      items: []
    }
  },
  methods: {
    addItem(evt) {
      evt.preventDefault();
      this.items.push(this.item);
      this.item = '';
    },
    removeAllItems() {
      this.items = [];
    }
  }
}
</script>

<style>
#app {
  margin-top: 60px;
}

#app .ui.label {
  float: right;
  cursor: pointer;
}
</style>