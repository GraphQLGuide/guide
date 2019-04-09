import React from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Button from 'material-ui/Button'
import { Formik } from 'formik'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'

import './TshirtOrderForm.css'
import images from '../../lib/images'
import LinkNewTab from './LinkNewTab'

const ADDRESS_QUERY = gql`
  query AddressQuery {
    currentUser {
      id
      shippingAddress
    }
  }
`

const ORDER_TSHIRT = gql`
  mutation OrderTshirt($product: Shirt!, $size: Size!) {
    orderTshirt(product: $product, size: $size) {
      id
      hasTshirt
    }
  }
`

const TshirtOrderForm = () => (
  <Query query={ADDRESS_QUERY}>
    {({ data }) => (
      <Mutation mutation={ORDER_TSHIRT}>
        {orderTshirt => (
          <Formik
            initialValues={{
              product: '',
              size: ''
            }}
            validate={values => {
              const errors = {}

              if (!values.product) {
                errors.product = 'Select an t-shirt option'
              }
              if (!values.size) {
                errors.size = 'Select a size'
              }

              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log('onSubmit', values)
              orderTshirt({
                variables: values,
                onCompleted: () => setSubmitting(false)
              }).catch(e => {
                const failedError = e.graphQLErrors.find(({ message }) =>
                  message.match('order-failed')
                )
                if (failedError) {
                  alert(
                    `Sorry! There was an error with your order. Please email tshirts@graphql.guide with your tshirt choice and address so we can send it manually 😊\n\n${
                      failedError.message
                    }`
                  )
                }
              })
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => {
              const { id, shippingAddress } = (data && data.currentUser) || {}

              const showProductError = !!(touched.product && errors.product),
                showSizeError = !!(touched.size && errors.size),
                mailto = `mailto:tshirts@graphql.guide?subject=New Tshirt Order&body=Option: ${
                  values.product
                }%0D%0ASize: ${
                  values.size
                }%0D%0AShipping address:%0D%0A%0D%0A%0D%0A%0D%0AUID: ${id}`

              return (
                <form className="TshirtOrderForm" onSubmit={handleSubmit}>
                  <FormControl error={showProductError}>
                    <InputLabel htmlFor="product">Option</InputLabel>
                    <Select
                      native
                      value={values.product}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      input={<Input id="product" />}
                    >
                      <option value="" />
                      <option value="GRAY">Gray</option>
                      <option value="NAVY">Navy</option>
                      <option value="CONTOURED">Contoured</option>
                    </Select>
                    {showProductError && (
                      <FormHelperText>{errors.product}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl error={showSizeError}>
                    <InputLabel htmlFor="size">Size</InputLabel>
                    <Select
                      native
                      value={values.size}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      input={<Input id="size" />}
                    >
                      <option value="" />
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </Select>
                    {showSizeError && (
                      <FormHelperText>{errors.size}</FormHelperText>
                    )}
                  </FormControl>
                  <div>
                    Size guide:
                    <div className="TshirtOrderForm-sizes">
                      <LinkNewTab href={images.url('gray-sizes')}>
                        gray
                      </LinkNewTab>
                      <LinkNewTab href={images.url('navy-sizes')}>
                        navy
                      </LinkNewTab>
                      <LinkNewTab href={images.url('contoured-sizes')}>
                        contoured
                      </LinkNewTab>
                    </div>
                  </div>
                  {shippingAddress && (
                    <div>
                      Shipping to:
                      <div className="TshirtOrderForm-address">
                        {shippingAddress.map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                      Wrong address? Order{' '}
                      <LinkNewTab href={mailto}>by email</LinkNewTab> instead.
                    </div>
                  )}
                  {shippingAddress && (
                    <Button
                      type="submit"
                      variant="raised"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      Order
                    </Button>
                  )}
                  {!shippingAddress && (
                    <div className="TshirtOrderForm-email-order">
                      Select which option and size you'd like, and then{' '}
                      <LinkNewTab href={mailto}>email us</LinkNewTab> with your
                      shipping address
                    </div>
                  )}
                </form>
              )
            }}
          </Formik>
        )}
      </Mutation>
    )}
  </Query>
)

export default TshirtOrderForm
