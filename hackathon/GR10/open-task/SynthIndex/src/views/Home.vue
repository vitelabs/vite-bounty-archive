<template>
  <Page>
    <Container class="mb-3">
      <h3 class="flex-auto" v-text="$t('myLiquidity')" />
    </Container>
    <ListPools
      :key="JSON.stringify(queryMyLiquidity)"
      :query="queryMyLiquidity"
      class="mb-4"
    />
    <Container class="mb-3">
      <h3 class="flex-auto" v-text="$t('My Index')" />
    </Container>
    <ListPools :key="JSON.stringify(queryMyPools)" :query="queryMyPools" />
  </Page>
</template>

<script>
export default {
  computed: {
    queryMyLiquidity() {
      const poolShares = this.subgraph.poolShares;
      const ids = Object.keys(poolShares).map(share => share.toLowerCase());
      return {
        where: {
          id_in: ids
        }
      };
    },
    queryMyPools() {
      return {
        where: {
        }
      };
    }
  },
  beforeMount() {
    if (!this.web3.account) this.$router.push({ name: 'explore' });
  }
};
</script>
