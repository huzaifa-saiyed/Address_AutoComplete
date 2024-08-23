<?php

namespace Kitchen365\AutoComplete\Controller\AutoComplete;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
use Magento\Customer\Model\ResourceModel\Address\CollectionFactory as AddressCollectionFactory;
use Magento\Framework\Controller\Result\JsonFactory;

class Street extends Action
{
    protected $addressCollectionFactory;
    protected $jsonFactory;

    public function __construct(
        Context $context,
        AddressCollectionFactory $addressCollectionFactory,
        JsonFactory $jsonFactory
    ) {
        parent::__construct($context);
        $this->addressCollectionFactory = $addressCollectionFactory;
        $this->jsonFactory = $jsonFactory;
    }

    public function execute()
    {
        $street = $this->getRequest()->getParam('street');
        $resultJson = $this->jsonFactory->create();
        $addresses = [];
        
        if ($street) {

            $addressCollection = $this->addressCollectionFactory->create();
            $addressCollection->addAttributeToSelect('street')
            ->addFieldToFilter('street', ['like' => $street . '%']);
        
            foreach ($addressCollection as $address) {
                $street = $address->getStreet();
           
                $addresses[] = $street[0];
            }
        }

        return $resultJson->setData(['addresses' => $addresses]);
    }
}
