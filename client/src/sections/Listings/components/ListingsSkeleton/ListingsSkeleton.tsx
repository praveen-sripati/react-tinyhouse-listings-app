import React from 'react';
import { Skeleton, Divider, Alert } from 'antd';
import "./styles/ListingsSkeleton.css"

interface Props {
  title: string;
  error?: boolean;
}

export const ListingsSkeleton = ({ title, error = false }: Props) => {

  const errorAlert = error ? (
    <Alert
      className="listings-skeleton__alert"
      type="error"
      message="Uh oh! Something went wrong - please try again later :("
    />
  ) : null;

  return (
    <div className="listings-skeleton">
      {errorAlert}
      <h1>{title}</h1>
      <Skeleton active paragraph={ { rows: 1 } }/>
      <Divider />
      <Skeleton active paragraph={ { rows: 1 } }/>
      <Divider />
      <Skeleton active paragraph={ { rows: 1 } }/>
    </div>
  )
}