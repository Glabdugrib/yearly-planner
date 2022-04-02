<template>
   <div class="month-card">

   </div>
</template>

<script>
export default {
   name: 'MonthCard',
}
</script>

<style lang="scss" scoped>

.month-card {
   border-radius: 8px;
   width:  calc( ( 100% - 15px * 3 ) / 4 );
   min-height: 200px;
   background-color: rgba(white, 0.05);
}

// L
@media screen and (max-width: 992px) {

   .month-card {
      width:  calc( ( 100% - 15px * 2 ) / 3 );
   }
}

// M
@media screen and (max-width: 768px) {

   .month-card {
      width:  calc( ( 100% - 15px * 1 ) / 2 );
   }
}

// S
@media screen and (max-width: 478px) {

   .month-card {
      width:  100%;
   }
}

</style>