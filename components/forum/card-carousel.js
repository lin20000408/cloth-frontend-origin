import React from 'react'
import { Card, Button, Row, Col } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import PostItem from './post-list/post-item'
import PostThumbCard from './post-thumb-card'

const data = [
  { title: 'tdkr114514', description: '2024-03-31' },
  { title: 'yamada9487', description: '2024-04-01' },
  { title: 'card3', description: '2024-04-02' },
  { title: 'card4', description: '2024-04-03' },
  { title: 'card5', description: '2024-04-04' },
  // ... add more cards as needed
]

const CardCarousel = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const cardsPerPage = 1

  const next = () => {
    if (currentIndex < data.length - cardsPerPage) {
      setCurrentIndex(currentIndex + cardsPerPage)
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - cardsPerPage)
    }
  }

  const cardCarouselStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const buttonStyle = {
    margin: '0 10px',
  }

  return (
    <div style={cardCarouselStyle}>
      <Button
        icon={<LeftOutlined />}
        onClick={prev}
        disabled={currentIndex === 0}
        style={buttonStyle}
      />
      <Col>
        <Row gutter={16}>
          {data
            .slice(currentIndex, currentIndex + cardsPerPage)
            .map((item, index) => (
              <Col key={index}>
                {/* <Card title={item.title} bordered={false}>
                  {item.description}
                </Card> */}
                <PostThumbCard userId={item.title} date={item.description} />
              </Col>
            ))}
        </Row>
      </Col>
      <Button
        icon={<RightOutlined />}
        onClick={next}
        disabled={currentIndex >= data.length - cardsPerPage}
        style={buttonStyle}
      />
    </div>
  )
}

export default CardCarousel
