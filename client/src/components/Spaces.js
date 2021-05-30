import React, { useEffect, useState } from "react";
import {
  Typography,
  PageHeader,
  Button,
  Modal,
  Form,
  Input,
  Table,
} from "antd";
import { SliderPicker } from "react-color";
import { getSpaces, postSpace } from "../api/spaces.instance";
const { Title } = Typography;

function Spaces() {
  const [modalOpen, setModalOpen] = useState(false);
  const [pickedColor, setPickedColor] = useState("#fff");
  const [spaceForm] = Form.useForm();

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

  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    getSpaces().then((answer) => {
      setSpaces([
        ...answer?.space.map(({ id, title, color }) => {
          return {
            key: id,
            title,
            color,
          };
        }),
      ]);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="spaces">
        <PageHeader
          className="site-page-header"
          title={<Title>All Spaces</Title>}
          extra={[
            <Button
              key="spaces-modal-opener"
              type="primary"
              onClick={(_) => {
                setModalOpen(true);
              }}
              disabled={loading}
              loading={loading}
            >
              Add space
            </Button>,
          ]}
        />

        <Table
          {...tableProps}
          loading={loading}
          rowClassName="row-data"
          columns={[
            {
              title: "Name",
              dataIndex: "title",
            },
            {
              title: "Color (HEX)",
              dataIndex: "color",
              render: (value) => {
                return <SliderPicker color={value} />;
              },
            },
          ]}
          dataSource={spaces}
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
        title="Add space"
        visible={modalOpen}
        onOk={(_) => {
          spaceForm
            .validateFields()
            .then(async (values) => {
              try {
                setLoading(true);
                const data = {
                  title: values?.title,
                  color: pickedColor?.hex,
                };
                await postSpace(data);

                let auxSpaces = await getSpaces();

                auxSpaces = auxSpaces?.space?.map(({ id, title, color }) => {
                  return {
                    key: id,
                    title,
                    color,
                  };
                });

                spaceForm.resetFields();
                setPickedColor("#fff");
                setSpaces(auxSpaces);
                setLoading(false);
                setModalOpen(false);
              } catch (err) {
                setLoading(false);
                console.error({ err });
              }
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        onCancel={(_) => {
          spaceForm.resetFields();
          setPickedColor("#fff");
          setModalOpen(false);
        }}
      >
        <Form form={spaceForm} wrapperCol={{ span: 16 }} name="add-space-form">
          <Form.Item
            label="Name"
            name="title"
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
            label="Color"
            name="color"
            rules={[
              {
                required: true,
                message: "Please pick a color!",
              },
            ]}
          >
            <SliderPicker
              color={pickedColor}
              onChangeComplete={(color) => {
                setPickedColor(color);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Spaces;
