<template>
  <div class="col-lg-3 col-md-6">
    <div class="card bg-light h-100">
      <div class="card-header">{{offer.company}}</div>
      <div class="d-flex flex-column card-body">
        <h5 class="card-title mt-2">{{offer.name}}</h5>
        <p class="card-text mt-2">{{offer.short_desc}}</p>
        <div class="mt-auto w-100">
          <div class="btn btn-outline-info disabled border-info">{{offer.created_at}}</div>
          <button
            type="button"
            class="btn btn-outline-success ml-5"
            data-toggle="modal"
            :data-target="'#offerModal' + offer.name"
          >See offer</button>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      tabindex="-1"
      :id="'offerModal' + offer.name"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            {{offer.name}}
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Dismiss</button>
            </div>
          </div>
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
  },
  methods: {
    seeOffer(id) {}
  }
};
</script>