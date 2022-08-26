import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import {
  Button,
  Input,
  Table,
  Space,
  Form,
  Modal,
  Select,
  message,
} from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { Link, useHistory } from "react-router-dom";
import { getAllCustomers } from "../../../controllers/customer.controller";
interface DataType {
  key: React.Key;
  _id: string;
  name: string;
  email: string;
  status: string;
  created_at: string;
}

type DataIndex = keyof DataType;

const AllCustomer: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [allCustomers, setAllCustomers]: any = useState();
  const history = useHistory();
  const [form2] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editCustomer, setEditCustomer]: any = useState();

  useEffect(() => {
    loadAllCustomers();
  }, []);

  const showModal = (data?: any) => {
    form2.resetFields();
    setEditCustomer(data);
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

  const onFinishEdit = (values: any) => {
    const data: any = {
      status: values.edit_status,
      _id: editCustomer._id,
    };
    console.log(data);

    // updateOppertunityForCustomr(data)
    //   .then((res: any) => {
    //     setVisible(false);
    //     message.success({
    //       content: "Successfully update a customer",
    //     });
    //     console.log(res.data);
    //     form2.resetFields();
    //   })
    //   .then((res: any) => {
    //     loadAllCustomers();
    //   })
    //   .catch((err) => {
    //     setVisible(false);
    //     if (err.response.data) {
    //       message.error({
    //         content: err.response.data.message,
    //       });
    //     } else {
    //       message.error({
    //         content: "Please check network connection",
    //       });
    //     }
    //   });
  };

  const loadAllCustomers = () => {
    getAllCustomers()
      .then((res: any) => {
        const data = res.data.map((itm: any) => {
          return {
            ...itm,
            key: itm._id,
          };
        });
        setAllCustomers(data);
      })
      .catch((err) => {
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
      ...getColumnSearchProps("status"),
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_, record) => (
        <Space size="middle" key={record._id}>
          <Button onClick={() => showModal(record)}>Update Customer</Button>
          <Button
            onClick={() => {
              history.push(`dashboard/customer/${record._id}`);
            }}
          >
            View Oppertunites
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {" "}
      <Table columns={columns} dataSource={allCustomers} key={1} />{" "}
      <Modal
        title={`${editCustomer && editCustomer.name}`}
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
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Non-Active">Non-Active</Select.Option>
                <Select.Option value="Lead">Lead</Select.Option>
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

export default AllCustomer;
