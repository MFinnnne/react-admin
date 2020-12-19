import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { BASE_URL } from '../../utils/Constants';
import { ResponseValue } from '../../api/Model';

function getBase64(file: any): Promise<any> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}
interface FileUploadResponseModel {
	url: string;
	name: string;
}

interface PicturesWallState {
	previewVisible: boolean;
	previewImage?: string;
	previewTitle?: string;
	fileList: UploadFile<any>[];
}

interface PicturesWallProps {
}

export default class PicturesWall extends Component<PicturesWallProps, PicturesWallState> {
	constructor(props: PicturesWallProps) {
		super(props);
		this.state = {
			previewVisible: false,
			previewImage: '',
			previewTitle: '',
			fileList: [],
		};
	}

	private handleCancel = () => this.setState({ previewVisible: false });

	private handlePreview = async (file: UploadFile<any>) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		this.setState({
			previewImage: file.url || file.preview,
			previewVisible: true,
			previewTitle: file.name || file.url?.substring(file.url.lastIndexOf('/') + 1),
		});
	};

	private handleChange = ({ file, fileList, event }: UploadChangeParam) => {
		if (file.status === 'done') {
			const result: ResponseValue<FileUploadResponseModel> = file.response as ResponseValue<FileUploadResponseModel>;
			if (result.status === 0 && result.data) {
				message.success('上传图片成功');
				fileList.forEach((item) => {
					item.name = result.data?.name ?? item.name;
					item.url = result.data?.url + '/files/' + result.data?.name ?? item.url;
				});
				this.setState({
					fileList,
				});
			} else {
				message.error('上传失败');
			}
		}
	};

	public getImages = (): string[] => {
		return this.state.fileList.map((file) => file.name ?? '');
	};

	render() {
		const { previewVisible, previewImage, fileList, previewTitle } = this.state;
		const uploadButton = (
			<div>
				<PlusOutlined />
				<div style={{ marginTop: 8 }}>Upload</div>
			</div>
		);
		return (
			<div>
				<Upload
					action={BASE_URL + '/uploadFile'}
					accept="image/*"
					listType="picture-card"
					name="image"
					fileList={fileList}
					onPreview={this.handlePreview}
					onChange={this.handleChange}
					multiple
				>
					{fileList.length >= 3 ? null : uploadButton}
				</Upload>
				<Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={this.handleCancel}>
					<img alt="example" style={{ width: '100%' }} src={previewImage} />
				</Modal>
			</div>
		);
	}
}
