import React, { useState } from "react";
import {
  Typography,
  PageHeader,
  Button,
  Modal,
  Form,
  Input,
  Table,
  Select,
} from "antd";

const { Title } = Typography;

function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryForm] = Form.useForm();

  const tableProps = {
    bordered: true,
    size: "default",
    showHeader: true,
    hasData: true,
    scroll: {
      x: "100%",
    },
  };

  const [categories, setCategories] = useState([]);

  return (
    <>
      <div className="categories">
        <PageHeader
          className="site-page-header"
          title={<Title>All Categories</Title>}
          extra={[
            <Button
              key="categories-modal-opener"
              type="primary"
              onClick={(_) => {
                setModalOpen(true);
              }}
            >
              Add category
            </Button>,
          ]}
        />
        <Table
          {...tableProps}
          rowClassName="row-data"
          columns={[
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Space",
              dataIndex: "space",
            },
          ]}
          dataSource={categories}
          style={{
            margin: "1rem 0",
          }}
          pagination={{
            hideOnSinglePage: true,
            defaultPageSize: 20,
            showSizeChanger: false,
          }}
        />
      </div>
      <Modal
        title="Add category"
        visible={modalOpen}
        onOk={(_) => {
          categoryForm
            .validateFields()
            .then((values) => {
              const aux = [...categories];
              aux.unshift({
                name: values?.name,
                space: values?.space,
              });
              categoryForm.resetFields();
              setCategories(aux);
              setModalOpen(false);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        onCancel={(_) => {
          categoryForm.resetFields();
          setModalOpen(false);
        }}
      >
        <Form
          form={categoryForm}
          wrapperCol={{ span: 16 }}
          name="add-space-form"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input a name for the space!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Space"
            name="space"
            rules={[
              {
                required: true,
                message: "Please pick a space!",
              },
            ]}
          >
            <Select>
              <Select.Option value="Space 1">Space 1</Select.Option>
              <Select.Option value="Space 2">Space 2</Select.Option>
              <Select.Option value="Space 3">Space 3</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Categories;
