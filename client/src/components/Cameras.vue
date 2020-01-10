<template>
  <div class="layout">
    <Card>
       <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            摄像头列表
        </p>
      <Table border :columns="columns" :data="cameras">
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" @click="showVideo(row)">视频</Button>
        </template>
      </Table>
    </Card>
    <VideoModal v-model="modalShow" :modal-data="modalData"></VideoModal>
  </div>
</template>

<script>
  import VideoModal from './VideoModal';
  export default {
    components: {
      VideoModal
    },
    data () {
      return {
        columns: [
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '描述',
            key: 'desc'
          },
          {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        cameras: [
          {
            id: 1,
            name: '摄像头1',
            desc: '测试摄像头'
          }
        ],
        modalShow: false,
        modalData: null
      }
    },
    methods: {
      showVideo(row) {
        this.modalData = {...row}
        this.modalShow = true
      }
    }
  }
</script>

<style lang="less" scoped>
.layout{
    position: relative;
    overflow: hidden;
    padding: 20px;
}
</style>