import { useState } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import { FaComment } from 'react-icons/fa'
import { addComment } from '@/services/comment'
import { Toaster, toast } from 'react-hot-toast'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'

export default function ActionComment({ article_id = 0, setComments }) {
  const { userIdData } = useBackEndData()
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false)
  const [form] = Form.useForm()

  const submitComment = async (uid, aid, content) => {
    if (uid && aid && content.trim()) {
      try {
        const data = await addComment(uid, aid, content)
        setComments((prevComments) => [...prevComments, data.comment]) // Append the new comment to the existing comments array
        form.resetFields() // Clear the form after submitting
        toast.success('留言發送成功')
      } catch (error) {
        console.error('Error adding comment:', error)
        toast.error('留言發送失敗')
      }
    } else {
      toast.error('需要登入會員')
    }
    setIsCommentModalVisible(false)
  }

  const handleSubmit = (values) => {
    submitComment(userIdData, article_id, values.comment)
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <FaComment
        size={20}
        onClick={() => setIsCommentModalVisible(true)}
        className="cursor-pointer"
      />
      <Modal
        title="留言"
        visible={isCommentModalVisible}
        onCancel={() => setIsCommentModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="comment">
            <Input.TextArea placeholder="說點什麼吧" rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onSubmit={addComment}>
              送出
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
