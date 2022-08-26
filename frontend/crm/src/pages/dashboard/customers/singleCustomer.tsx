import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import {
  Button,
  Input,
  Space,
  Table,
  Modal,
  Form,
  Select,
  message,
} from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Title from "antd/lib/typography/Title";
import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { Link, useParams } from "react-router-dom";
import {
  getOppertuntiesBasedOnCustomer,
  createOppertunityForCustomr,
  updateOppertunityForCustomr,
} from "../../../controllers/customer.controller";
import "../../../assets/styles/singlecustomer.css";
import { offset } from "@popperjs/core";

interface DataType {
  key: React.Key;
  _id: string;
  name: string;
  created_at: string;
  status: string;
}

type DataIndex = keyof DataType;
type SizeType = Parameters<typeof Form>[0]["size"];

const SingleCustomer: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [customerDetails, setcustomerDetails]: any = useState();
  const [oppertunites, setOppertunites]: any = useState();
  const [editOppertunity, setEditOppertunity]: any = useState();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const id: any = useParams();
  useEffect(() => {
    loadAllOppertunites();
  }, []);

  const onFinish = (values: any) => {
    const data: any = {
      name: values.name,

      status: values.status,
      customer_id: id.id,
    };
    createOppertunityForCustomr(data)
      .then((res: any) => {
        message.success({
          content: "Successfully created an oppertunity",
        });
        console.log(res.data);
        form.resetFields();
      })
      .then((res: any) => {
        loadAllOppertunites();
      })
      .catch((err:any) => {
        if (err.response.data) {
          message.error({
            content: err.response.data.message,
          });
        } else {
          message.error({
            content: "Please check network connection",
          });
        }
      });
  };
  const onFinishEdit = (values: any) => {
    const data: any = {
      status: values.edit_status,
      _id: editOppertunity._id,
    };
    updateOppertunityForCustomr(data)
      .then((res: any) => {
        setVisible(false);
        message.success({
          content: "Successfully update an oppertunity",
        });
        console.log(res.data);
        form2.resetFields();
      })
      .then((res: any) => {
        loadAllOppertunites();
      })
      .catch((err:any) => {
        setVisible(false);
        if (err.response.data) {
          message.error({
            content: err.response.data.message,
          });
        } else {
          message.error({
            content: "Please check network connection",
          });
        }
      });
  };

  const showModal = (data?: any) => {
    form2.resetFields();
    setEditOppertunity(data);
    setVisible(true);
  };

  const handleOk = (values: any) => {
    console.log(values);

    setConfirmLoading(true);

    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
    form2.resetFields();
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
    form2.resetFields();
  };

  const loadAllOppertunites = () => {
    getOppertuntiesBasedOnCustomer(id.id)
      .then((res: any) => {
        if (res.data.length > 0) {
          setcustomerDetails({
            name: res.data[0].name,
            email: res.data[0].email,
            _id: res.data[0]._id,
            status: res.data[0].status,
            created_at: res.data[0].created_at,
          });

          setOppertunites(
            res.data[0].oppertunties.map((item: any) => {
              return {
                ...item,
                key: item._id,
              };
            })
          );
        }
      })
      .catch((err:any) => {
        console.log(err);
      });
  };
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "30%",
      ...getColumnSearchProps("status"),
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_, record) => (
        <Button type="primary" onClick={() => showModal(record)}>
          Update Status
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Title level={3}>Add Oppertunity</Title>
      <Form
        layout="vertical"
        className="row-col"
        form={form}
        onFinish={onFinish}
        name="addOppertunity"
        scrollToFirstError
      >
        <div className="row">
          <div className="col-md-4">
            <Form.Item
              label="Name"
              className="username"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input oppertunity name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item
              label="Status"
              className="username"
              name="status"
              rules={[{ required: true, message: "Please select status!" }]}
            >
              <Select placeholder="select status">
                <Select.Option value="New">New</Select.Option>
                <Select.Option value="Closed-Won">Closed-Won</Select.Option>
                <Select.Option value="Closed-Lost">Closed-Lost</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item>
              <Button type="primary" htmlType="submit" name="submit">
                {" "}
                Submit
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
      <Title level={3}>All Oppertunites</Title>
      <Table columns={columns} dataSource={oppertunites} key={1} />{" "}
      <Modal
        title={`${editOppertunity && editOppertunity.name}`}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          layout="vertical"
          className="row-col"
          form={form2}
          onFinish={onFinishEdit}
          name="editOppertunity"
          scrollToFirstError
        >
          <div className="col-md-4">
            <Form.Item
              label="Status"
              className="username"
              name="edit_status"
              rules={[{ required: true, message: "Please select status!" }]}
            >
              <Select placeholder="Update status">
                <Select.Option value="New">New</Select.Option>
                <Select.Option value="Closed-Won">Closed-Won</Select.Option>
                <Select.Option value="Closed-Lost">Closed-Lost</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item>
              <Button type="primary" htmlType="submit" name="submit">
                {" "}
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default SingleCustomer;
