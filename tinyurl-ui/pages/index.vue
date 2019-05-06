<template>
  <div class="row">
    <div class="col-12">
      <b-input-group 
        size="lg" 
        class="mt-3">
        <b-form-input
          id="longUrl"
            v-model="longUrl"
            type="text"
            placeholder="Enter URL to shorten"
            @input="validateUrl">
        </b-form-input>
        <b-input-group-append>
          <b-button 
            block
            variant="primary"
            v-on:click="shortenUrl"
            :disabled="validUrl == false">Shorten me!</b-button>
        </b-input-group-append>
      </b-input-group>
      <div
        class="mt-2 text-danger" 
        v-if="!validUrl">Invalid URL added</div>
    </div>

    <div class="col-12 mt-5">
      <h1 class="display-4">History</h1>
      <b-list-group :key="render">
        <b-list-group-item
          v-for="url in urlHistory" v-bind:key="url.hash">
          <div class="row">
            <div class="col-8">
              {{url.longUrl}}
            </div>
            <div class="col-4">
              <a
                target="_blank"
                v-bind:href="url.shortUrl"
                class="link">
                {{url.shortUrl}}
              </a>
            </div>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      longUrl: '',
      render: 0,
      validUrl: true,
      urlHistory: window.localStorage.getItem('history') ? JSON.parse(window.localStorage.getItem('history')) : [],
    }
  },
  methods: {
    updateHistory(history) {
      window.localStorage.setItem('history', JSON.stringify(history));
      this.longUrl = '';
      this.urlHistory = JSON.parse(window.localStorage.getItem('history'));
      this.render+= 1;
    },
    async shortenUrl() {
      await this.$axios.post('//localhost:3000/tinyurl?longUrl=' + this.longUrl)
      await this.$axios.post(`${process.env.apiUrl}/tinyurl?longUrl=${this.longUrl}`)
      .then(result => {
        if (result && result.data && result.data.shortUrl && result.data.shortUrl != "") {
          const urlObject = {
            "shortUrl" : result.data.shortUrl,
            "longUrl" : result.data.longUrl
          };

          if (window.localStorage.getItem('history') != null) {
            const history = JSON.parse(window.localStorage.getItem('history'));
            history.push(urlObject);

            if (history.length > process.env.stackLength) {
              history.shift();
            }
            this.updateHistory(history);
          } else {
            const history = [];
            history.push(urlObject);
            this.updateHistory(history);
          }
        }
      })
      .catch(error => console.log(error));
    },
    validateUrl(url){
      var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
      this.validUrl = valid;
    },
  },
}
</script>
