<template>
  <div class="col-lg-3 col-md-6">
    <div class="card bg-light h-100">
      <div class="card-header">{{offer.company}}</div>
      <div class="d-flex flex-column card-body">
        <h5 class="card-title mt-2">{{offer.name}}</h5>
        <p class="card-text mt-2">{{offer.short_desc}}</p>
        <div class="mt-auto w-100">
          <div
            class="btn btn-outline-info btn-light disabled border-info"
          >{{offer.created_at}}</div>
          <div
            class="btn btn-outline-info btn-light disabled border-info ml-5"
          >See offer</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["offer"],
  data() {
    return {};
  }
};
</script>