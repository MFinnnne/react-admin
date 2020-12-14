import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

function getBase64(file: any): Promise<any> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

interface PicturesWallState {
	previewVisible: boolean;
	previewImage?: string;
	previewTitle?: string;
	fileList: UploadFile<any>[];
}

export default class PicturesWall extends Component<{}, PicturesWallState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			previewVisible: false,
			previewImage: '',
			previewTitle: '',
			fileList: [
				{
					uid: '-1',
					size: 0,
					name: 'image.png',
					url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
					type: '',
				},
			],
		};
	}

	handleCancel = () => this.setState({ previewVisible: false });

	handlePreview = async (file: UploadFile<any>) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		this.setState({
			previewImage: file.url || file.preview,
			previewVisible: true,
			previewTitle: file.name || file.url?.substring(file.url.lastIndexOf('/') + 1),
		});
	};

	handleChange = ({ fileList }: UploadChangeParam) => this.setState({ fileList });

	render() {
		const { previewVisible, previewImage, fileList, previewTitle } = this.state;
		const uploadButton = (
			<div>
				<PlusOutlined />
				<div style={{ marginTop: 8 }}>Upload</div>
			</div>
		);
		return (
			<>
				<Upload
					action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					listType="picture-card"
					fileList={fileList}
					onPreview={this.handlePreview}
					onChange={this.handleChange}
				>
					{fileList.length >= 8 ? null : uploadButton}
				</Upload>
				<Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={this.handleCancel}>
					<img alt="example" style={{ width: '100%' }} src={previewImage} />
				</Modal>
			</>
		);
	}
}
