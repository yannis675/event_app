<template>
  <v-data-table>

      <v-toolbar flat color="white">
        <v-dialog v-model="dialog">
          <template v-slot:activator="{ on, attrs }">
              <v-btn color="#b47bff">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
          </template>
        </v-dialog>
      </v-toolbar>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
    </template>

  </v-data-table>
</template>