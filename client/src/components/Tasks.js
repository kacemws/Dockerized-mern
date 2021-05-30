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
  DatePicker,
} from "antd";
const { Title } = Typography;

function Tasks() {
  const [modalOpen, setModalOpen] = useState(false);
  const [taskForm] = Form.useForm();

  const tableProps = {
    bordered: true,
    size: "default",
    showHeader: true,
    hasData: true,
    scroll: {
      x: "100%",
    },
  };

  const [tasks, setTasks] = useState([]);
  return (
    <>
      <div className="tasks">
        <PageHeader
          className="site-page-header"
          title={<Title>All Tasks</Title>}
          extra={[
            <Button
              key="tasks-modal-opener"
              type="primary"
              onClick={(_) => {
                setModalOpen(true);
              }}
            >
              Add task
            </Button>,
          ]}
        />
        <Table
          {...tableProps}
          rowClassName="row-data"
          columns={[
            {
              title: "Value",
              dataIndex: "value",
            },
            {
              title: "Category",
              dataIndex: "category",
            },
            {
              title: "Deadline",
              dataIndex: "deadline",
              render: (deadline) => {
                console.log(typeof deadline?.toDate());
                return deadline?.format("MM/DD/YYYY");
              },
            },
          ]}
          dataSource={tasks}
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
        title="Add task"
        visible={modalOpen}
        onOk={(_) => {
          taskForm
            .validateFields()
            .then((values) => {
              const aux = [...tasks];
              console.log(values);
              aux.unshift({
                ...values,
              });
              taskForm.resetFields();
              setTasks(aux);
              setModalOpen(false);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        onCancel={(_) => {
          taskForm.resetFields();
          setModalOpen(false);
        }}
      >
        <Form form={taskForm} wrapperCol={{ span: 16 }} name="add-task-form">
          <Form.Item
            label="Value"
            name="value"
            rules={[
              {
                required: true,
                message: "Please input the task!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please pick a category!",
              },
            ]}
          >
            <Select>
              <Select.Option value="Category 1">Category 1</Select.Option>
              <Select.Option value="Category 2">Category 2</Select.Option>
              <Select.Option value="Category 3">Category 3</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Deadline" name="deadline">
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Tasks;
