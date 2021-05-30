import React, { useEffect, useState } from "react";
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
import { getSpaces } from "../api/spaces.instance";
import { getCategories, postCategory } from "../api/categories.instance";

const { Title } = Typography;

function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryForm] = Form.useForm();

  const [loading, setLoading] = useState(true);

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
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    getSpaces().then((spaces) => {
      const aux = spaces?.space?.map((space) => {
        return {
          value: space["_id"],
          label: space?.title,
        };
      });
      console.log(aux);
      setSpaces(aux);
      setLoading(false);
    });
  }, []);

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
              disabled={loading}
              loading={loading}
              onClick={(_) => {
                setModalOpen(true);
              }}
            >
              Add category
            </Button>,
          ]}
        />
        <Select
          style={{
            minWidth: "8rem",
            margin: "1rem 0",
          }}
          disabled={loading}
          onChange={async (space) => {
            setLoading(true);
            let auxCategories = await getCategories(space);

            auxCategories = auxCategories?.category?.map((category) => {
              return {
                key: category["_id"],
                title: category?.title,
              };
            });

            setCategories(auxCategories);
            setLoading(false);
          }}
        >
          {spaces.map(({ value, label }) => {
            return <Select.Option value={value}>{label}</Select.Option>;
          })}
        </Select>
        <Table
          {...tableProps}
          rowClassName="row-data"
          loading={loading}
          columns={[
            {
              title: "Name",
              dataIndex: "title",
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
        onOk={async (_) => {
          try {
            setLoading(true);

            categoryForm
              .validateFields()
              .then(async (values) => {
                const data = {
                  title: values?.name,
                  space: values?.space,
                };
                await postCategory(data);

                let auxCategories = await getCategories(values?.space);

                auxCategories = auxCategories?.category?.map((category) => {
                  return {
                    key: category["_id"],
                    title: category?.title,
                  };
                });

                categoryForm.resetFields();
                setCategories(auxCategories);
                setLoading(false);
                setModalOpen(false);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
                throw info;
              });
          } catch (err) {
            setLoading(false);
            console.error({ err });
          }
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
              {spaces.map(({ value, label }) => {
                return <Select.Option value={value}>{label}</Select.Option>;
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Categories;
